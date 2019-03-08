function removeAllOverlays() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    	let activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, {"message": "RemoveOverlays"});
   	});
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("remove-button").addEventListener("click", removeAllOverlays);
});

/*chrome.runtime.onMessage.addListener(function (request) {
	if(request.message === "validSite"){
		document.getElementById("text").innerText = "SpoilerAlert has detected that you are on a website that it is capable of blocking. If it finds any spoilers, it will block them for you.";
		document.getElementById("remove-button").style.visibility = "visible";
	}
});*/
