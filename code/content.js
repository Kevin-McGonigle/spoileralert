createOverlays()

function createOverlays(){
	totalElements = getTotalElements()

	for (i = 0; i < totalElements.length; i++)  // For each element, generate an overlay div, position it, style it and append it to the document
	{	
		points = findCoordinates(totalElements, i)
		var overlayDiv = document.createElement("Div") // Create the overlayDiv
		overlayDiv.className = "overlay"


		overlayDiv.style.width = Math.ceil(points[3]) + "px" // set the position of the overlayDiv
		overlayDiv.style.top = Math.ceil(points[0]) + "px"
		overlayDiv.style.left = (Math.ceil(points[1]) - 10) + "px"
		overlayDiv.style.height = Math.ceil(points[2]) + "px"

		overlayDiv.style.border = "2px solid black" 	// Style the overlay
		overlayDiv.style.borderRadius = "5px"
		overlayDiv.style.background = "lightgrey" 
		overlayDiv.style.position = "absolute"
		overlayDiv.style.zIndex = "2"			// Must be set to 2, this places the overlay above the text
		
		document.body.appendChild(overlayDiv)
		turnOneDivOn(overlayDiv)

		var disableButton = document.createElement("button")	// make a button for removing the div
		disableButton.innerHTML = "Reveal"
		disableButton.className = "disable"
		disableButton.style.position = "relative"

		//Style the button
		disableButton.style.right = "75px"
		disableButton.style.width = "65px"
		disableButton.style.height = "25px"
		disableButton.style.background = "salmon"



		disableButton.onclick = function() {removeOverlay(this)}
		overlayDiv.appendChild(disableButton)
	}
}


function getTotalElements(){
	const elements = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "p"]
	var totalElements = []
	for (i = 0; i < elements.length; i++)  // Get all the html tags that can contain text that we can block
	{
		var list = document.getElementsByTagName(elements[i])
		totalElements.push.apply(totalElements, list)
	}
	return totalElements
}

function removeOverlay(button){
	button.parentElement.style.visibility = "hidden"		// Get the parent div of the button and set display to none
}


function findCoordinates(list, index){
	var rect = list[index].getBoundingClientRect()
	var height = rect.bottom - rect.top
	var width = rect.right - rect.left
	return [rect.top, rect.left, height, width];
}

function turnOneDivOn(div) {
  	div.style.display = "block"
}

function disableBlocking(){		// Stops all blocking of text
	var list = document.getElementsByClassName("overlay")	// Every overlay div is given the class "overlay" in the createOverlays function above
	for (i = 0; i < list.length; i++)
	{
		list[i].style.visibility = "hidden"
	}
}