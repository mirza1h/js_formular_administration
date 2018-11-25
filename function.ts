function searchForm(userInput: string) {
  if (userInput == "") {
    alert("Please enter some text to search");
    return;
  }
  // If form doesn't exists inside map create a new one under that name.
  let array: htmlElements[] = mapOfForms.get(userInput+version);
  if (array == undefined) {
    alert("Form doesn't exist. Create a form: " + userInput);
    document.getElementById("add").style.display = "block";
    createDefaultForm();
    return;
  }
  // Reset page, so a new form can be displayed.
  firstDiv.innerHTML = "";
  let lastNumber: string;
  for(var i = 0; i < array.length; i++ ) {
    firstDiv.appendChild(array[i]);
    if(array[i].tagName == "SPAN")
      lastNumber = array[i].textContent;
  }
  // Restore number of elements in form in case of editing.
  elementCount = parseInt(lastNumber.substr(8),10);
  return;
}
var version: number = 0;
// Creates default form elements after invalid search, and adds more fields.
function createDefaultForm() {
  let br: any = document.createElement("br");
  firstDiv.appendChild(br);
  ++elementCount;
  let text = new Labels("defaultForm","Element " + elementCount,"span","el" + elementCount);
  firstDiv.appendChild(text.elmnt);
  let input = new Inputs("text","inp " + elementCount,"defaultForm",false);
  input.append();
  let selectDrop1 = new Select("Textbox","input","Checkbox","checkbox","Radio","radio")
  selectDrop1.select.addEventListener("click",radioSelected);
  selectDrop1.addName("defaultForm");
  selectDrop1.append();
  let selectDrop2 = new Select("Mandatory","true","None","false","Number","number")
  selectDrop2.addName("defaultForm");
  selectDrop2.append();
  arrayOfElements.push(br,text.elmnt,input.elmnt,selectDrop1.select,selectDrop2.select);
  return;
}

// Store the copied array of current form into a map and add a new option to Formulars dropdown.
function storeForm(userInput: string) {
  version = 0;
  elementCount = 0;
  // If form existed before add new elements to it by concating previous and current array.
  let clonedArray: htmlElements[]
  if(mapOfForms.has(userInput+version) == true) {
    let existingArray: htmlElements[] = mapOfForms.get(userInput+version);
    existingArray = existingArray.concat(arrayOfElements);
    clonedArray = existingArray.slice(0);
    ++version;
  }else {
    var option = new Option(userInput);
    dropdown.appendChild(option);
    clonedArray = arrayOfElements.slice(0);
  }
  arrayOfElements = [];
  mapOfForms.set(userInput + version,clonedArray);
  firstDiv.innerHTML = "";
  return;
}

var radioLabel: string;
// Search the map for the array of selected form and convert to form items based on user selection.
function getForm(selectedItem: string) {
  let field = (<HTMLInputElement>document.getElementById("version")).value;
  let vers: string = field;
  let array: htmlElements[] = (<htmlElements[]>mapOfForms.get(selectedItem+vers));
  if(array == undefined){
    alert("No form under that version!")
    return;
  }
  // Reset div so a new form can be displayed.
  formReset.innerHTML = "";
  // Loop through elements and convert them based on input, also add validation.
  for(var i = 0; i < array.length; ++i) {
    if(array[i].type == "radio") {
      let temp1 = new Inputs("radio","radios " + i,"radios",false);
      formReset.appendChild(temp1.elmnt);
    }
    if(array[i].tagName == "INPUT" && array[i].type != "radio") {
        let temp3 = new Labels("labels",array[i].value,"span",array[i].id);
        formReset.appendChild(temp3.elmnt);
      }
    else if(array[i].tagName == "SELECT") {
      let temp4 = new Inputs(array[i].value,"inputs " + i,"defaultForm",false);
      if(array[i].value != "radio") {
        formReset.appendChild(temp4.elmnt);
      }
      if(array[i].value == "radio"){
        radioLabel = array[i-1].id;
      }
      if(array[i+1].value == "true") {
        temp4.elmnt.required = true;
      }
      else if(array[i+1].value == "number") {
        temp4.elmnt.type = "number";
        temp4.elmnt.required = true;
      }
      if(array[i].value == "radio")
        i+=2;
      else
        ++i;
    }
    else if(array[i].tagName == "BR") {
      var temp = document.createElement("br");
      formReset.appendChild(temp);
    }
  } 
  document.getElementById(radioLabel).className = "defaultForm";
  formReset.reportValidity();
  return;
}

// Store the user input into map and reset fields.
function submitForm() {
  let currentData = new Data();
  currentData.store(dataMap);
}