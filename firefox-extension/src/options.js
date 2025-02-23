// chrome.tabs.query({}, tabs => {
//     tabs.forEach(tab => {
//         chrome.tabs.sendMessage(tab.id, { message: "your message here" });
//     });
// });

function getMutedState() {
    chrome.storage.sync.get('muteEnabled', data => {
        console.log('Mute enabled:', data.muteEnabled);
        document.querySelector('#muteToggle').checked = data.muteEnabled;
    });
}

function saveOptions(e) {
    e.preventDefault();
    console.log('Saving options');
    console.log(e)
    const isChecked = document.querySelector('#muteToggle').checked;
    console.log('Checked:', isChecked);
    chrome.storage.sync.set({
        muteEnabled: isChecked
    });

    chrome.tabs.query({}, tabs => {
        console.log('Tabs:', tabs);
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { action: 'toggleMute', mute: isChecked });
        });
    })
    // toggle the mute state
    document.querySelector('#muteToggle').checked = !document.querySelector('#muteToggle').checked;

    getMutedState();
}

document.addEventListener('DOMContentLoaded', () => {
    // get the current state of the muteEnabled option and save it to a boolean
    console.log('Document loaded');
    getMutedState();
    // when checkbox with id muteToggle is clicked, saveOptions is called
    // document.querySelector('#muteToggle').addEventListener('mouseup', saveOptions);
    console.log('Event listener added');

});
