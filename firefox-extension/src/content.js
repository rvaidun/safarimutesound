console.log('Content script loadedasdfasdf');
let listener;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Message received:', request);
    if (request.action === 'toggleMute') {
        if (request.mute) {
            muteAllAudio();
            // lisetn for new audio elements
            listener = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.addedNodes) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO') {
                                node.muted = true;
                            }
                        });
                    }
                });
            });
            listener.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            unmuteAllAudio();
            listener.disconnect();
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