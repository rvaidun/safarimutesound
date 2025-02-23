// chrome.tabs.query({}, tabs => {
//     tabs.forEach(tab => {
//         chrome.tabs.sendMessage(tab.id, { message: "your message here" });
//     });
// });


function getMutedState() {
    chrome.storage.sync.get('muteEnabled', data => {
        console.log('Mute enabled:', data.muteEnabled);
        if (data.muteEnabled) {
            document.querySelector('#muteToggle').classList.add('checked');
        }
    });
}

function saveOptions(e) {
    // e.preventDefault();
    console.log('Saving options');
    console.log(e)
    const isChecked = document.querySelector('#muteToggle').classList.contains('checked');
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
}
let clickedTimes = 0;
document.addEventListener('DOMContentLoaded', () => {
    // get the current state of the muteEnabled option and save it to a boolean
    console.log('Document loaded');
    getMutedState();
    // when checkbox with id muteToggle is clicked, saveOptions is called
    // document.querySelector('#muteToggle').addEventListener('change', saveOptions);
    //    document.querySelector('.toggle-container').addEventListener('click', saveOptions);
    // document.querySelector('#muteToggle2').addEventListener('click', () => {
    //     // document.querySelector("#muteToggle").innerHTML = `Clicked ${++clickedTimes} times`;
    //     document.querySelector('#muteToggle').classList.toggle('checked');


    // });
    document.querySelector('#muteToggle').addEventListener('click', () => {
        // document.querySelector("#muteToggle").innerHTML = `Clicked ${++clickedTimes} times`;
        document.querySelector('#muteToggle').classList.toggle('checked');
        saveOptions();


    });
    console.log('Event listener added');

});
