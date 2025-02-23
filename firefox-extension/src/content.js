console.log('Content script loadedasdfasdf');
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Message received:', request);
    if (request.action === 'toggleMute') {
        if (request.mute) {
            muteAllAudio();
        } else {
            unmuteAllAudio();
        }
    }
});
chrome.storage.sync.get('muteEnabled', function (data) {
    console.log('Mute enabled:', data.muteEnabled);
    if (data.muteEnabled) {
        muteAllAudio();
    }
});
function muteAllAudio() {
    console.log('Muting all audio');
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(audio => {
        audio.muted = true;
    });
}

function unmuteAllAudio() {
    console.log('Unmuting all audio');
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(audio => {
        audio.muted = false;
    });
}