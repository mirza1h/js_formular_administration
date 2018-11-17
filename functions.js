var elementCount = 0;
var map = new Map(); // Map used for storing forms. Keys are search inputs and arrays of form elements are values.
var arrayOfElements = []; // Array used for temporary storage of every form.
var dropDown = document.getElementById("existingForm");
var firstDiv = document.getElementById("return");
var formReset = document.getElementById("valid");
var dataMap = new Map();  // Map used for submiting data. Keys are labels, and values are user inputs.


// Switch between pages and color tabs.
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

// Creates three default form elements after invalid search, and adds more fields.
function createDefaultForm() {
  ++elementCount;
	// Create element labels.
  var text = document.createElement("span");
  text.setAttribute("display","inline");
  text.textContent = "Element " + elementCount;
  firstDiv.appendChild(text);
  // Create input fields.
	var input = document.createElement("input");
	input.setAttribute("type","text");
  input.className = "defaultForm";
  firstDiv.appendChild(input);
  // Create select dropdowns and add options.
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
  // Add a new line.
  var breakLine = document.createElement("br");
  firstDiv.appendChild(breakLine);
  // Push all created elements to array.
  arrayOfElements.push(text,input,select1,select2,breakLine);
  return;
}

// Store the copied array of current form into a map
// and add a new option to Formulars dropdown.
function storeForm(userInput) {
  elementCount=0;
  // If form existed before add new elements to it by concating previous and current array.
  if(map.has(userInput) == true) {
    var existingArray = map.get(userInput);
    existingArray = existingArray.concat(arrayOfElements);
    var clonedArray = existingArray.slice(0);
  }
  // A new form was just created so add the option with that name to dropdown.
  else {
    var option = new Option(userInput);
    dropDown.appendChild(option);
    var clonedArray = arrayOfElements.slice(0);
  }
  // Reset array so a new form can be added and store a copy of form in a map.
  arrayOfElements = [];
  map.set(userInput,clonedArray);
  firstDiv.innerHTML = "";
  return;
}

// Search the map for the array of selected form and
// convert to form items based on user selection.
function getForm(selectedItem) {
  var div = document.getElementById("valid");
  // Fetch array with that name.
  var array = map.get(selectedItem);
  // Reset div so a new form can be displayed.
  div.innerHTML = "";
  // Loop through elements and convert them based on input, also add validation.
  for(var i = 0; i < array.length; i++) {
    if(array[i].tagName == "INPUT") {
      var temp = document.createElement("span");
      temp.textContent = array[i].value;
      temp.className = "defaultForm";
      div.appendChild(temp);
      }
    else if (array[i].tagName == "SELECT") {
      var temp = document.createElement("input");
      temp.setAttribute("type",array[i].value);
      if(array[i+1].value == "true") {
        temp.required = true;
      }
      else if(array[i+1].value == "number") {
        temp.setAttribute("type","number");
      }
      ++i;
      temp.className = "defaultForm";
      div.appendChild(temp);
    }
    else if (array[i].tagName == "BR"){
      var temp = document.createElement("br");
      temp.className = "defaultForm";
      div.appendChild(temp);
    }
  }
  return;
}

function searchForm(userInput) {
  // If search button is clicked without any input display warning.
  if (userInput == "") {
    window.alert("Please enter some text to search");
    return;
  }
  // If form doesn't exists inside map. Create a new one under that name.
  var array = map.get(userInput);
  if (array == undefined) {
    window.alert("Form doesn't exist. Create a form: " + userInput);
    document.getElementById("add").style.display = "block";
    createDefaultForm();
    return;
  }
  // Reset page, so a new form can be displayed.
  firstDiv.innerHTML = "";
  for( var i = 0; i < array.length; i++ ) {
    firstDiv.appendChild(array[i]);
  }
  return;
}

// Store the user input into map and reset fields.
function submitForm() {
  // Get data.
  var inpObj = document.getElementsByTagName('input');
  // Get the labels.
  var spanObj = document.getElementsByTagName('span');
  // Store them in a map.
  for (var i = 0; i < spanObj.length; ++i){
    dataMap.set(spanObj[i].textContent,inpObj[i+1].value);
  }
  formReset.reset();
  window.alert("Data submited!");
}

// Create an example form on wabpage load, so the Formulars dropdown is not empty.
function exampleForm() {
	var text1 = document.createElement("span");
  var text2 = document.createElement("span");
  var input1 = document.createElement("input");
	input1.setAttribute("type","text");
  input1.className = "defaultForm";
	input1.value = "Label 1:";
  var input2 = document.createElement("input");;
  input2.value = "Label 2:*";
  input2.className = "defaultForm";

  var select1 = document.createElement("select");
	var option1 = new Option("Textbox","input",true,true);
	var option2 = new Option("Checkbox","checkbox",false,false);

  var select2 = document.createElement("select");
	var option3 = new Option("Mandatory","true",false,false);
	var option4 = new Option("None","false",false,false);
	var option5 = new Option("Numeric","number",true,true);

  select1.className = "defaultForm";
  select2.className = "defaultForm";
	select1.appendChild(option1);
	select1.appendChild(option2);
	select2.appendChild(option3);
	select2.appendChild(option4);
	select2.appendChild(option5);
  var select3 = document.createElement("select");
	var option6 = new Option("Textbox","input",false,false);
	var option7 = new Option("Checkbox","checkbox",true,true);

  var select4 = document.createElement("select");
  var option8 = new Option("Mandatory","true",true,true);
	var option9 = new Option("None","false",false,false);
	var option10 = new Option("Numeric","number",false,false);
  select3.className = "defaultForm";
  select4.className = "defaultForm";
	select3.appendChild(option6);
	select3.appendChild(option7);
	select4.appendChild(option8);
	select4.appendChild(option9);
	select4.appendChild(option10);

  var br = document.createElement("br");
  arrayOfElements.push(text1,input1,select1,select2,br,text2,input2,select3,select4,br);
  storeForm("Example");
  return;
}


