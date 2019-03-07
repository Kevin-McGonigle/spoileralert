chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
	console.log("Received message");
	sendResponse("Background got your message");
});

