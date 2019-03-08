chrome.runtime.onMessage.addListener(function (request) {
    if(request.message === "validSite"){
        chrome.browserAction.setIcon({path: "images/logo-no-spoiler.png"});
    }
    else if(request.message.includes("spoilerCount")){
        chrome.browserAction.setIcon({path: "images/logo-spoiler.png"});
        //chrome.browserAction.setBadgeText({text: request.message.split()[1]});
    }
});