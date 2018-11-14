function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function createDefaultForm(){
	var div = document.getElementById("Administration");
	var text = document.createElement("span");
  text.setAttribute("display","inline");
	var node = document.createTextNode("Element 1");
	text.appendChild(node);
	div.appendChild(text);

	var input = document.createElement("input");
	input.setAttribute("type","text");
	input.setAttribute("placeholder","Label 1");
  input.className = "defaultForm";
  div.appendChild(input);

  var select1 = document.createElement("select");
	var select2 = document.createElement("select");
	var option1 = new Option("Textbox","Value",false,false);
	var option2 = new Option("Mandatory","Value",false,false);
  select1.className = "defaultForm";
  select2.className = "defaultForm";
	select1.appendChild(option1);
	select2.appendChild(option2);
	div.appendChild(select1);
	div.appendChild(select2);
  var breakLine = document.createElement("br");
  div.appendChild(breakLine);
}
var arrayOfElements = [];
function addItem(type) {
	var div = document.getElementById("Administration");
  if(type == "text" || type == "checkbox" || type == "radio"){
    var element = document.createElement("input");
    element.setAttribute("type",type);
    element.className = "defaultForm";
    div.appendChild(element);
    arrayOfElements.push(element);
    return;
  }
  if (type == "select"){
    var element = document.createElement("select");
    var option = new Option("Textbox","Value",false,false);
	  element.appendChild(option);
    element.className = "defaultForm";
    div.appendChild(element);
    arrayOfElements.push(element);
    return;
  }
  var element = document.createElement(type);
  div.appendChild(element);
  arrayOfElements.push(element);
  element.className = "defaultForm";
}

function storeForm(){
  var div = document.getElementById("Formular");
  var i;
  for (i = 0;i<arrayOfElements.length;i++){
    div.appendChild(arrayOfElements[i]);
  }
}
