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

function searchForm() {
  // Map is currently empty, so create default form
  createDefaultForm();
}

var firstDiv = document.getElementById("Administration");
  // Creates three default form elements after invalid search
function createDefaultForm(){
	var text = document.createElement("span");
  text.setAttribute("display","inline");
	var node = document.createTextNode("Element 1");
	text.appendChild(node);
	firstDiv.appendChild(text);

	var input = document.createElement("input");
	input.setAttribute("type","text");
	input.setAttribute("placeholder","Label 1");
  input.className = "defaultForm";
  firstDiv.appendChild(input);

  var select1 = document.createElement("select");
	var select2 = document.createElement("select");
	var option1 = new Option("Textbox","Value",false,false);
	var option2 = new Option("Mandatory","Value",false,false);
  select1.className = "defaultForm";
  select2.className = "defaultForm";
	select1.appendChild(option1);
	select2.appendChild(option2);
	firstDiv.appendChild(select1);
	firstDiv.appendChild(select2);
  var breakLine = document.createElement("br");
  firstDiv.appendChild(breakLine);
  arrayOfElements.push(text,input,select1,select2,breakLine);
}

var elementCount = 1;
var map = new Map();
var arrayOfElements = [];
  // Create rest of the form elements based on user dropdown selection and stores them into array
function addItem(type) {
  if(type == "text" || type == "checkbox" || type == "radio"){
    var element = document.createElement("input");
    element.setAttribute("type",type);
    element.className = "defaultForm";
    firstDiv.appendChild(element);
    arrayOfElements.push(element);
    return;
  }
  if (type == "select"){
    var element = document.createElement("select");
    var option = new Option("Textbox","Value",false,false);
	  element.appendChild(option);
    element.className = "defaultForm";
    firstDiv.appendChild(element);
    arrayOfElements.push(element);
    return;
  }
  ++elementCount;
  var element = document.createElement(type);
	var text = document.createElement("span");
  text.setAttribute("display","inline");
	var node = document.createTextNode("Element " + elementCount);
	text.appendChild(node);
  firstDiv.appendChild(element);
  firstDiv.appendChild(text);
  arrayOfElements.push(element);
  arrayOfElements.push(text);
  element.className = "defaultForm";
}

var dropDown = document.getElementById("existingForm");
  // Store the array of current form into a map
function storeForm(){
  var userInput = document.getElementById("userInput").value;
  var option = new Option(userInput);
  dropDown.appendChild(option);
  var clonedArray = arrayOfElements.slice(0);
  arrayOfElements = [];
  map.set(userInput,clonedArray);
}

  // Search the map for the array of selected form and display it
function getForm(selectedItem) {
  var i;
  var div = document.getElementById("Forms");
  var array = map.get(selectedItem);
  div.innerHTML = "";
  for(i = 0;i<array.length;i++){
    div.appendChild(array[i]);
  }
}

