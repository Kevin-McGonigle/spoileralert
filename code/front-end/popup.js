/*function removeAllOverlays(){
	console.log("Pressed the button")
	chrome.tabs.sendMessage({method: "disableBlocking"})
};
*/

 function removeAllOverlays() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "RemoveOverlays"});
   });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button1").addEventListener("click", removeAllOverlays);
});