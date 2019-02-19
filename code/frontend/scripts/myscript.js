function createOverlays(){
	var list = document.getElementsByTagName("p")
	for (i = 0; i < list.length; i++)
	{		

		points = findElements(list, i)
		var div = document.createElement("div") // Create the div
		div.className = "overlay"

		var width = getTextWidth(list[i].innerHTML, "12pt open sans")
		div.style.width = Math.ceil(width) + "px" // set the position of the div
		div.style.top = Math.floor(points[0]) + "px"
		div.style.left = Math.floor(points[1]) + "px"
		div.style.height = "19px"

		div.style.background = "red" // Set other properties of the div
		div.style.display = "none"   // Default to none
		div.style.position = "fixed"
		
		document.body.appendChild(div)
		on(div)
	}
}

function findElements(list, index){
	var rect = list[index].getBoundingClientRect()
	var width = rect.right - rect.left
	return [rect.top, rect.left, width];
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

function moveTheDiv(div, top, left){
	div.style.top = top
	div.style.left = left
	return div
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