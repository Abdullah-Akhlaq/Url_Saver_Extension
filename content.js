// content.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getTabUrl") {
        const url = window.location.href;
        sendResponse({ url });
    }
});
