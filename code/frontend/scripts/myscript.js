function createOverlays(){
	totalElements = getTotalElements()

	for (i = 0; i < totalElements.length; i++)  // For each element, generate an overlay div, position it, style it and append it to the document
	{	
		points = findCoordinates(totalElements, i)
		var div = document.createElement("div") // Create the div
		div.className = "overlay"


		var width = getTextWidth(totalElements[i].textContent, "12pt open sans")	// open sans is used on joe.ie, 12pt seems to be the standard for websites. 
		div.style.width = Math.ceil(points[3]) + "px" // set the position of the div
		div.style.top = Math.ceil(points[0]) + "px"
		div.style.left = Math.ceil(points[1]) + "px"
		div.style.height = Math.ceil(points[2]) + "px"
		div.style.border = "3px solid black"
		div.style.borderRadius = "5px"

		div.style.background = "grey" // Style the div
		div.style.display = "none"   // Default to none, this is later changed by the on() function
		div.style.position = "fixed"
		
		document.body.appendChild(div)
		on(div)
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

function findCoordinates(list, index){
	var rect = list[index].getBoundingClientRect()
	var height = rect.bottom - rect.top
	var width = rect.right - rect.left
	return [rect.top, rect.left, height, width];
}

// From stack overflow at https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function on(div) {
  	div.style.display = "block"
}

function off() {
	var list = document.getElementsByClassName("overlay")
	for (i = 0; i < list.length; i++)
	{
		list[i].style.display = "none"
	}
}