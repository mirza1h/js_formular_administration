function openPage(pageName, elmnt) {
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
    elmnt.style.backgroundColor = "white";
    return;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function searchForm(userInput) {
  var array = map.get(userInput);
  if (array == undefined) {
    window.alert("Form doesn't exist. Create a form under that name:");
    createDefaultForm();
    return;
  }
  for( var i = 0; i < array.length; i++ ) {
    firstDiv.appendChild(array[i]);
  }
  return;
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
	input.setAttribute("placeholder","Label " + elementCount);
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
  return;
}

var labelCount = 1;
var elementCount = 1;
var map = new Map();
var arrayOfElements = [];
  // Create rest of the form elements based on user dropdown selection and stores them into array
function addItem(type) {
  if(type == "text" || type == "checkbox" || type == "radio"){
    var element = document.createElement("input");
    element.setAttribute("type",type);
    if(type == "text") {
      ++labelCount;
    }
    element.setAttribute("placeholder","Label " + labelCount);
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
  return;
}

var dropDown = document.getElementById("existingForm");
  // Store the copied array of current form into a map
function storeForm(userInput) {
  if(map.has(userInput) == true){
    var existingArray = map.get(userInput);
    existingArray = existingArray.concat(arrayOfElements);
    var clonedArray = existingArray.slice(0);
  }
  else{
  var option = new Option(userInput);
  dropDown.appendChild(option);
  var clonedArray = arrayOfElements.slice(0);
  }
  arrayOfElements = [];
  map.set(userInput,clonedArray);
  return;
}

  // Search the map for the array of selected form and display it
function getForm(selectedItem) {
  var div = document.getElementById("Forms");
  var array = map.get(selectedItem);
  div.innerHTML = "";
  for(var i = 0; i < array.length; i++){
    div.appendChild(array[i]);
  }
  return;
}

  // Create an example form, so the the Formulars dropdown is not empty
function exampleForm() {
	var text1 = document.createElement("span");
	var text2 = document.createElement("span");
	var text3 = document.createElement("span");
	var text4 = document.createElement("span");
	var node1 = document.createTextNode("Element 1");
	var node2 = document.createTextNode("Element 2");
	var node3 = document.createTextNode("Element 3");
	text1.appendChild(node1);
	text2.appendChild(node2);
	text3.appendChild(node3);

	var input1 = document.createElement("input");
	input1.setAttribute("type","text");
	input1.setAttribute("placeholder","Label " + 1);
  input1.className = "defaultForm";
	var input2 = document.createElement("input");
	input2.setAttribute("type","text");
  input2.setAttribute("placeholder","Label " + 2);
  input2.className = "defaultForm";

  var checkbox = document.createElement("input");
  checkbox.setAttribute("type","checkbox");
  checkbox.className = "defaultForm";
  var node4 = document.createTextNode("Example:");
  text4.appendChild(node4);
  text4.className = "defaultForm";
  var select1 = document.createElement("select");
	var option1 = new Option("Textbox","Value",false,false);
  select1.className = "defaultForm";
	select1.appendChild(option1);
  var breakLine = document.createElement("br");
  arrayOfElements.push(text1,input1,select1,text2,input2,breakLine,text3,text4,checkbox);
  storeForm("Example");
  return;
}
