var elementCount: number = 0;
var arrayOfElements: htmlElements[] = []; // Array used for temporary storage of every form.
let mapOfForms: Map<string,Array<HTMLElement>>= new Map<string,Array<HTMLElement>>(); // Map used for storing forms. Keys are search inputs and arrays of form elements are values.
var dropdown: HTMLSelectElement = <HTMLSelectElement> document.getElementById("existingForm");
var firstDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("return");
var formReset: HTMLFormElement = <HTMLFormElement>document.getElementById("valid");


// Switch between pages and color tabs.
function openPage(pageName: string, elmnt: HTMLElement) {
  // Hide all elements with class="tabcontent" by default.
  let tabcontent: HTMLCollectionOf<HTMLDivElement>, tablinks: HTMLCollectionOf<HTMLButtonElement>;
  tabcontent = (<HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("tabcontent"));
  let i: number;
  for (i = 0; i < tabcontent.length; ++i) {
    tabcontent[i].style.display = "none";
  }
  // Remove the background color of all buttons.
  tablinks = (<HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("tablink"));
  for (i = 0; i < tablinks.length; ++i) {
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


function searchForm(userInput: string) {
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
  let i: number;
  let lastNumber: string;
  for(i = 0; i < array.length; i++ ) {
    firstDiv.appendChild(array[i]);
    if(array[i].tagName == "SPAN")
      lastNumber = array[i].textContent;
  }
  // Restore number of elements in form in case of editing.
  elementCount = parseInt(lastNumber.substr(8),10);
  return;
}


// Creates three default form elements after invalid search, and adds more fields.
function createDefaultForm() {
  // Add a new line.
  let br: any = document.createElement("br");
  firstDiv.appendChild(br);
  ++elementCount;
	// Create element labels.
  let text: HTMLSpanElement = (<HTMLSpanElement>document.createElement("span"));
  text.setAttribute("display","inline");
  text.textContent = "Element " + elementCount;
  firstDiv.appendChild(text);
  // Create input fields.
  let input: HTMLInputElement = (<HTMLInputElement>document.createElement("input"));
  input.setAttribute("type","text");
  input.className = "defaultForm";
  firstDiv.appendChild(input);
  // Create select dropdowns and add options.
  let select1: HTMLSelectElement =(<HTMLSelectElement> document.createElement("select"));
	let option1: HTMLOptionElement = new Option("Textbox","input",false,false);
	var option2: HTMLOptionElement = new Option("Checkbox","checkbox",false,false);
	var option3: HTMLOptionElement = new Option("Radio","radio",false,false);
  select1.addEventListener("click",radioSelected);
  select1.className = "defaultForm";
  
  let select2: HTMLSelectElement =(<HTMLSelectElement> document.createElement("select"));
	var option4: HTMLOptionElement = new Option("Mandatory","true",false,false);
	var option5: HTMLOptionElement = new Option("None","false",false,false);
	var option6: HTMLOptionElement = new Option("Numeric","number",false,false);
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

// Event listener function that creates a select form for number of radio labels.
function radioSelected(event){
  if(event.target.value == "radio") {
    let select1: HTMLSelectElement =(<HTMLSelectElement> document.createElement("select"));
	  let option1: HTMLOptionElement = new Option("2","2",false,false);
	  var option2: HTMLOptionElement = new Option("3","3",false,false);
	  var option3: HTMLOptionElement = new Option("4","4",false,false);
    select1.addEventListener("click",radioLabels);
    select1.className = "defaultForm";
    select1.appendChild(option1);
	  select1.appendChild(option2);
    select1.appendChild(option3);
    firstDiv.appendChild(select1);
    arrayOfElements.push(select1);
  }
}

// Creates a previously selected nubmer of radio labels.
function radioLabels(event) {
  let num: number = event.target.value;
  let i: number;
  for( i = 0; i < num; ++i){
    let label: HTMLInputElement = (<HTMLInputElement>document.createElement("input"));
    let radio: HTMLInputElement = (<HTMLInputElement>document.createElement("input"));
    let br: HTMLBRElement = (<HTMLBRElement>document.createElement("br"));
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
function storeForm(userInput: string) {
  elementCount = 0;
  // If form existed before add new elements to it by concating previous and current array.
  if(mapOfForms.has(userInput) == true) {
    let existingArray: htmlElements[] = mapOfForms.get(userInput);
    existingArray = existingArray.concat(arrayOfElements);
    let clonedArray: htmlElements[] = existingArray.slice(0);
  }
  // A new form was just created so add the option with that name to dropdown.
  else {
    var option = new Option(userInput);
    dropdown.appendChild(option);
    var clonedArray: htmlElements[] = arrayOfElements.slice(0);
  }
  // Reset array so a new form can be added and store a copy of form in a map.
  arrayOfElements = [];
  mapOfForms.set(userInput,clonedArray);
  firstDiv.innerHTML = "";
  return;
}
class htmlElements extends HTMLElement{
  value?: any;
  type?: any;
}

// Search the map for the array of selected form and
// convert to form items based on user selection.
function getForm(selectedItem: string) {
  // Fetch array with that name.
  let array: htmlElements[] = (<htmlElements[]>mapOfForms.get(selectedItem));
  // Reset div so a new form can be displayed.
  formReset.innerHTML = "";
  // Loop through elements and convert them based on input, also add validation.
  for(var i = 0; i < array.length; ++i) {
    if(array[i].type == "radio") {
      let temp1: HTMLInputElement = (<HTMLInputElement>document.createElement("input"));
      temp1.type = "radio";
      temp1.className = "radios";
      temp1.checked = false;
      formReset.appendChild(temp1);
    }
    if(array[i].tagName == "INPUT" && array[i].type != "radio") {
      if(array[i+1].value == "radio"){
        let temp2: HTMLParagraphElement = (<HTMLParagraphElement>document.createElement("p"));
        temp2.className = "defaultForm";
        temp2.textContent = array[i].value;
        formReset.appendChild(temp2);
      }
      else {
        let temp3: HTMLSpanElement = (<HTMLSpanElement>document.createElement("span"));
        temp3.className = "labels";
        temp3.textContent = array[i].value;
        formReset.appendChild(temp3);
      }
    }
    else if(array[i].tagName == "SELECT") {
      let temp4: HTMLInputElement = (<HTMLInputElement>document.createElement("input"));
      if(array[i].value != "radio") {
        temp4.type = array[i].value;
        temp4.className = "defaultForm";
        formReset.appendChild(temp4);
      }
      if(array[i+1].value == "true") {
        temp4.required = true;
      }
      else if(array[i+1].value == "number") {
        temp4.setAttribute("type","number");
        temp4.required = true;
      }
      else{
        temp4.required = false;
      }
      if(array[i].value == "radio")
        i+=2;
      else
        ++i;
    }
    else if(array[i].tagName == "BR") {
      var temp = document.createElement("br");
      temp.className = "defaultForm";
      formReset.appendChild(temp);
    }
  }
  // Display validation messages.
  formReset.reportValidity();
  return;
}

var dataMap: Map<string,string> = new Map<string,string>();  // Map used for submiting data. Keys are labels, and values are user inputs.
// Store the user input into map and reset fields.
function submitForm() {
let currentData = new Data();
currentData.store(dataMap);
}



