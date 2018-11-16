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
  // If form exists display it, otherwise create a new one under that name
function searchForm(userInput) {
  if (userInput == "") {
    window.alert("Please enter some text to search");
    return;
  }
  var array = map.get(userInput);
  if (array == undefined) {
    window.alert("Form doesn't exist. Create a form: " + userInput);
    document.getElementById("add").style.display = "block";
    createDefaultForm();
    return;
  }
  for( var i = 0; i < array.length; i++ ) {
    firstDiv.appendChild(array[i]);
  }
  return;
}

var firstDiv = document.getElementById("return");
  // Creates three default form elements after invalid search
function createDefaultForm() {
  ++elementCount;
	var text = document.createElement("span");
  text.setAttribute("display","inline");
	var node = document.createTextNode("Element " + elementCount);
	text.appendChild(node);
	firstDiv.appendChild(text);

	var input = document.createElement("input");
	input.setAttribute("type","text");
  input.className = "defaultForm";
  firstDiv.appendChild(input);

  var select1 = document.createElement("select");
	var option1 = new Option("Textbox","input",false,false);
	var option2 = new Option("Checkbox","checkbox",false,false);
	var select2 = document.createElement("select");
	var option3 = new Option("Mandatory","true",false,false);
	var option4 = new Option("None","false",false,false);
	var option5 = new Option("Numeric","number",false,false);
  select1.className = "defaultForm";
  select2.className = "defaultForm";
	select1.appendChild(option1);
	select1.appendChild(option2);
	select2.appendChild(option3);
	select2.appendChild(option4);
	select2.appendChild(option5);
	firstDiv.appendChild(select1);
	firstDiv.appendChild(select2);
  var breakLine = document.createElement("br");
  firstDiv.appendChild(breakLine);
  arrayOfElements.push(text,input,select1,select2,breakLine);
  return;
}

var elementCount = 0;
var map = new Map();
var arrayOfElements = [];
  // Create rest of the form elements based on user dropdown selection and stores them into array
//function addItem(type) {
//  if(type == "")
//    return;
//  if(type == "text" || type == "checkbox" || type == "radio") {
//    var element = document.createElement("input");
//    element.setAttribute("type",type);
//    if(type == "text") {
//      ++labelCount;
//    }
//    element.setAttribute("placeholder","Label " + labelCount);
//    element.className = "defaultForm";
//    firstDiv.appendChild(element);
//    arrayOfElements.push(element);
//    return;
//  }
//  if (type == "select") {
//    var element = document.createElement("select");
//    var option = new Option("Textbox","Value",false,false);
//	  element.appendChild(option);
//    element.className = "defaultForm";
//    firstDiv.appendChild(element);
//    arrayOfElements.push(element);
//    return;
//  }
//  ++elementCount;
//  var element = document.createElement(type);
//	var text = document.createElement("span");
//  text.setAttribute("display","inline");
//	var node = document.createTextNode("Element " + elementCount);
//	text.appendChild(node);
//  firstDiv.appendChild(element);
//  firstDiv.appendChild(text);
//  arrayOfElements.push(element);
//  arrayOfElements.push(text);
//  element.className = "defaultForm";
//  return;
//}

var dropDown = document.getElementById("existingForm");
  // Store the copied array of current form into a map
function storeForm(userInput) {
  elementCount=0;
  if(map.has(userInput) == true) {
    var existingArray = map.get(userInput);
    existingArray = existingArray.concat(arrayOfElements);
    var clonedArray = existingArray.slice(0);
  }
  else {
  var option = new Option(userInput);
  dropDown.appendChild(option);
  var clonedArray = arrayOfElements.slice(0);
  }
  arrayOfElements = [];
  map.set(userInput,clonedArray);
  firstDiv.innerHTML = "";
  return;
}

  // Search the map for the array of selected form and display it
function getForm(selectedItem) {
  var div = document.getElementById("valid");
  var array = map.get(selectedItem);
  div.innerHTML = "";
  for(var i = 0; i < array.length; i++) {
    if(array[i].tagName == "INPUT"){
      var temp = document.createElement("span");
      var node = document.createTextNode(array[i].value);
      temp.className = "defaultForm";
      temp.appendChild(node);
      div.appendChild(temp);
    } else if (array[i].tagName == "SELECT"){
      var temp = document.createElement("input");
      temp.setAttribute("type",array[i].value);
      //window.alert(array[i].value);
      //window.alert(array[i+1].options[array[i+1].selectedIndex].text);
      if(array[i+1].options[array[i+1].selectedIndex].text= "Mandatory"){
        temp.required = true;
      }
      if(array[i+1].options[array[i+1].selectedIndex].text= "Numeric")
        temp.setAttribute("type","number");
      //window.alert(array[i].required);
      ++i;
      temp.className = "defaultForm";
      div.appendChild(temp);
    } else if (array[i].tagName == "BR"){
      var temp = document.createElement("br");
      temp.className = "defaultForm";
      div.appendChild(temp);
    }
  }
  return;
}

  // Create an example form, so the Formulars dropdown is not empty
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
