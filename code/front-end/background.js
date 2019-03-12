chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.message === "validSite") {
        chrome.pageAction.show(sender.tab.id);
    }
});