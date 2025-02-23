// This file contains the background script for the extension. It listens for changes in the extension's options and communicates with the content script to mute or unmute sounds based on the user's preference.

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ muted: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleMute") {
        chrome.storage.sync.get("muted", (data) => {
            const newMutedState = !data.muted;
            chrome.storage.sync.set({ muted: newMutedState });
            sendResponse({ muted: newMutedState });
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.tabs.sendMessage(tab.id, { muted: newMutedState });
                });
            });
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});