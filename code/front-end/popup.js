/*function removeAllOverlays(){
	console.log("Pressed the button")
	chrome.tabs.sendMessage({method: "disableBlocking"})
};
*/

var isExtensionOn = true;

function EnableDisableButton() {
	var button = document.getElementById("enableDisableButton");
	if (button.innerHTML === "Disable SpoilerAlert") 
		isExtensionOn = false;
	else if (button.innerHTML === "Enable SpoilerAlert")
		isExtensionOn = true;
	else
		alert("Error");
}

function removeAllOverlays() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "RemoveOverlays"});
   });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button1").addEventListener("click", removeAllOverlays);
  document.getElementById('enableDisableButton').addEventListener("click", disableExtension)
});


