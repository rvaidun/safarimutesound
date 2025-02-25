// chrome.tabs.query({}, tabs => {
//     tabs.forEach(tab => {
//         chrome.tabs.sendMessage(tab.id, { message: "your message here" });
//     });
// });
let currentHostName = '';
function setMutedToggle() {
    const key = `muteEnabled-${currentHostName}`;
    chrome.storage.sync.get(key, data => {
        console.log('Data:', data);
        console.log('Key:', key);
        console.log('Data[key]:', data[key]);
        if (data[key]) {
            document.querySelector('#muteToggle').classList.add('checked');
        }
    });
}

function saveOptions(isChecked) {
    const key = `muteEnabled-${currentHostName}`;
    console.log('Saving:', isChecked, key);
    chrome.storage.sync.set({ [key]: isChecked });
}
function setWebsiteNameInPopup() {
    // get the name of the current tab
    console.log('Setting website name');
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const url = tabs[0].url;
        // convert URL to hostname
        const hostname = new URL(url).hostname;
        currentHostName = hostname;
        console.log('currentHostName:', currentHostName);
        document.querySelector('#websiteNameInjector').innerHTML = currentHostName;
        setMutedToggle();
    });
}

function getHostName() {
}
document.addEventListener('DOMContentLoaded', async () => {
    // get the current state of the muteEnabled option and save it to a boolean
    setWebsiteNameInPopup();

    document.querySelector('#muteToggle').addEventListener('click', () => {
        // document.querySelector("#muteToggle").innerHTML = `Clicked ${++clickedTimes} times`;
        document.querySelector('#muteToggle').classList.toggle('checked');
        const isChecked = document.querySelector('#muteToggle').classList.contains('checked');
        saveOptions(isChecked);
        // send a message to active tab to mute/unmute audio
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, { action: 'toggleMute', mute: isChecked });
        });
    });
    console.log('Event listener added');
});