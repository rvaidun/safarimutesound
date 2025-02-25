console.log('Content script loadedasdfasdf');
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleMute') {
        if (request.mute) {
            muteAllAudio();
        } else {
            unmuteAllAudio();
        }
    }
});
// get the hostname of current tab
const url = window.location.href;
const hostname = new URL(url).hostname;
const key = `muteEnabled-${hostname}`;
// chrome.storage.sync.get('muteEnabled', function (data) {
//     if (data.muteEnabled) {
//         muteAllAudio();
//     }
// });
chrome.storage.sync.get(key, function (data) {
    if (data[key]) {
        muteAllAudio();
    }
});
function muteAllAudio() {
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(audio => {
        audio.muted = true;
    });
}

function unmuteAllAudio() {
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(audio => {
        audio.muted = false;
    });
}