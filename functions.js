var elementCount = 0;
var mapOfForms = new Map(); // Map used for storing forms. Keys are search inputs and arrays of form elements are values.
var arrayOfElements = []; // Array used for temporary storage of every form.
var dropdown = document.getElementById("existingForm");
var firstDiv = document.getElementById("return");
var formReset = document.getElementById("valid");
var dataMap = new Map();  // Map used for submiting data. Keys are labels, and values are user inputs.


// Switch between pages and color tabs.
function openPage(pageName, elmnt) {
  // Hide all elements with class="tabcontent" by default.
  var tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; ++i) {
    tabcontent[i].style.display = "none";
  }
  // Remove the background color of all buttons.
  tablinks = document.getElementsByClassName("tablink");
  for (var i = 0; i < tablinks.length; ++i) {
    tablinks[i].style.backgroundColor = "";
  }
  // Show the specific tab content.
  document.getElementById(pageName).style.display = "block";
  // Add the specific color to the button used to open the tab content.
  elmnt.style.backgroundColor = "white";
  return;
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


function searchForm(userInput) {
  // If search button is clicked without any input display warning.
  if (userInput == "") {
    window.alert("Please enter some text to search");
    return;
  }
  // If form doesn't exists inside map create a new one under that name.
  var array = mapOfForms.get(userInput);
  if (array == undefined) {
    window.alert("Form doesn't exist. Create a form: " + userInput);
    document.getElementById("add").style.display = "block";
    createDefaultForm();
    return;
  }
  // Reset page, so a new form can be displayed.
  firstDiv.innerHTML = "";
  for(var i = 0; i < array.length; i++ ) {
    firstDiv.appendChild(array[i]);
    // Restore number of elements in form in case of editing.
    if(array[i].tagName == "SPAN")
      var lastNumber = array[i].textContent;
  }
  elementCount = parseInt(lastNumber.substr(8),10);
  return;
}


// Creates three default form elements after invalid search, and adds more fields.
function createDefaultForm() {
  // Add a new line.
  var br = document.createElement("br");
  firstDiv.appendChild(br);
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
	var option3 = new Option("Radio","radio",false,false);
  select1.addEventListener("click",radioSelected);
  var select2 = document.createElement("select");
	var option4 = new Option("Mandatory","true",false,false);
	var option5 = new Option("None","false",false,false);
	var option6 = new Option("Numeric","number",false,false);

  select1.className = "defaultForm";
  select2.className = "defaultForm";
	select1.appendChild(option1);
	select1.appendChild(option2);
  select1.appendChild(option3);
	select2.appendChild(option4);
	select2.appendChild(option5);
	select2.appendChild(option6);
	firstDiv.appendChild(select1);
	firstDiv.appendChild(select2);
  // Push all created elements to array.
  arrayOfElements.push(br,text,input,select1,select2);
  return;
}

// Event listener function that creates radio buttons and labels.
function radioSelected(event){
  if(event.target.value == "radio") {
    var select1 = document.createElement("select");
	  var option1 = new Option("2","2",false,false);
	  var option2 = new Option("3","3",false,false);
	  var option3 = new Option("4","4",false,false);
    select1.addEventListener("click",radioLabels);
    select1.className = "defaultForm";
    select1.appendChild(option1);
	  select1.appendChild(option2);
    select1.appendChild(option3);
    firstDiv.appendChild(select1);
    arrayOfElements.push(select1);
  }
}


function radioLabels(event) {
  var number = event.target.value;
  for(var i = 0; i < number; ++i){
    var label = document.createElement("input");
    var radio = document.createElement("input");
    var br = document.createElement("br");
    radio.type = "radio";
    radio.checked = false;
    radio.className = "radios";
    radio.id = "radio " + i;
    label.type = "text";
    label.className = "defaultForm";
    label.id = "label " + i;
    firstDiv.appendChild(br);
    firstDiv.appendChild(radio);
    firstDiv.appendChild(label);
    arrayOfElements.push(br,radio,label);
  }
}


// Store the copied array of current form into a map
// and add a new option to Formulars dropdown.
function storeForm(userInput) {
  elementCount=0;
  // If form existed before add new elements to it by concating previous and current array.
  if(mapOfForms.has(userInput) == true) {
    var existingArray = mapOfForms.get(userInput);
    existingArray = existingArray.concat(arrayOfElements);
    var clonedArray = existingArray.slice(0);
  }
  // A new form was just created so add the option with that name to dropdown.
  else {
    var option = new Option(userInput);
    dropdown.appendChild(option);
    var clonedArray = arrayOfElements.slice(0);
  }
  // Reset array so a new form can be added and store a copy of form in a map.
  arrayOfElements = [];
  mapOfForms.set(userInput,clonedArray);
  firstDiv.innerHTML = "";
  return;
}


// Search the map for the array of selected form and
// convert to form items based on user selection.
function getForm(selectedItem) {
  var div = document.getElementById("valid");
  // Fetch array with that name.
  var array = mapOfForms.get(selectedItem);
  // Reset div so a new form can be displayed.
  div.innerHTML = "";
  // Loop through elements and convert them based on input, also add validation.
  for(var i = 0; i < array.length; ++i) {
    if(array[i].type == "radio") {
      var temp = document.createElement("input");
      temp.setAttribute("type","radio");
      temp.className = "radios";
      temp.checked = false;
      div.appendChild(temp);
    }
    if(array[i].tagName == "INPUT" && array[i].type != "radio") {
      if(array[i+1].value == "radio"){
        var temp = document.createElement("p");
        temp.className = "defaultForm";
      }
      else {
      var temp = document.createElement("span");
      temp.className = "labels";
      }
      temp.textContent = array[i].value;
      div.appendChild(temp);
    }
    else if(array[i].tagName == "SELECT") {
      if(array[i].value != "radio"){
        var temp = document.createElement("input");
        temp.setAttribute("type",array[i].value);
      }
      if(array[i+1].value == "true") {
        temp.required = true;
      }
      else if(array[i+1].value == "number") {
        temp.setAttribute("type","number");
        temp.required = true;
      }
      else
	      temp.required = false;
      if(array[i].value == "radio")
        i+=2;
      else
        ++i;
      temp.className = "defaultForm";
      div.appendChild(temp);
    }
    else if(array[i].tagName == "BR") {
      var temp = document.createElement("br");
      temp.className = "defaultForm";
      div.appendChild(temp);
    }
  }
  // Display validation messages.
  formReset.reportValidity();
  return;
}


// Store the user input into map and reset fields.
function submitForm() {
  // Get data.
  var inpObj = formReset.getElementsByTagName("input");
  // Get the labels.
  var spanObj = formReset.getElementsByClassName("labels");
  // Store them in a map.
  if(validation(inpObj) == 1) {
    for(var i = 0; i < spanObj.length; ++i) {
      if(inpObj[i].value == "on" && inpObj[i].checked == false)
        inpObj[i].value = "off";
      console.log(spanObj[i].textContent,inpObj[i].value);
      dataMap.set(spanObj[i].textContent,inpObj[i].value);
    }
    formReset.reset();
    window.alert("Data submitted!");
  }
}


// Check for empty inputs and focus on them.
function validation(inputs) {
  var empty = 0;
  for(var i = 0;i < inputs.length; ++i) {
    if(inputs[i].required == true && inputs[i].value == "") {
      ++empty;
      alert("Fill out mandatory fields!");
      inputs[i].focus();
    }
  }
  if(empty != 0)
    return 0;
  else
    return 1;
}


// Create an example form on wabpage load, so the Formulars dropdown is not empty.
function exampleForm() {
	var text1 = document.createElement("span");
  text1.textContent = "Element 1";
  var text2 = document.createElement("span");
  text2.textContent = "Element 2";
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
	  var option3 = new Option("Radio","radio",false,false);
  select1.addEventListener("click",radioSelected);

  var select2 = document.createElement("select");
	  var option4 = new Option("Mandatory","true",false,false);
	  var option5 = new Option("None","false",false,false);
	  var option6 = new Option("Numeric","number",true,true);

  select1.className = "defaultForm";
  select2.className = "defaultForm";
	select1.appendChild(option1);
	select1.appendChild(option2);
	select1.appendChild(option3);
	select2.appendChild(option4);
	select2.appendChild(option5);
	select2.appendChild(option6);

  var select3 = document.createElement("select");
	  var option6 = new Option("Textbox","input",false,false);
	  var option7 = new Option("Checkbox","checkbox",true,true);
	  var option8 = new Option("Radio","radio",false,false);
  select3.addEventListener("click",radioSelected);

  var select4 = document.createElement("select");
    var option9 = new Option("Mandatory","true",true,true);
	  var option10 = new Option("None","false",false,false);
	  var option11 = new Option("Numeric","number",false,false);
  select3.className = "defaultForm";
  select4.className = "defaultForm";
	select3.appendChild(option6);
	select3.appendChild(option7);
	select3.appendChild(option8);
	select4.appendChild(option9);
	select4.appendChild(option10);
	select4.appendChild(option11);
  var br = document.createElement("br");
  arrayOfElements.push(br,text1,input1,select1,select2,br,text2,input2,select3,select4);
  storeForm("Example");
  return;
}


