function removeAllOverlays() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    	let activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, {"message": "RemoveOverlays"});
   	});
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button1").addEventListener("click", removeAllOverlays);
});
