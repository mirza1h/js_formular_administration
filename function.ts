
function searchForm(userInput: string) {
  // If search button is clicked without any input display warning.
  if (userInput == "") {
    window.alert("Please enter some text to search");
    return;
  }
  // If form doesn't exists inside map create a new one under that name.
  let array: htmlElements[] = mapOfForms.get(userInput);
  if (array == undefined) {
    window.alert("Form doesn't exist. Create a form: " + userInput);
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


// Creates three default form elements after invalid search, and adds more fields.
function createDefaultForm() {
  let br: any = document.createElement("br");
  firstDiv.appendChild(br);
  ++elementCount;
  let text = new Labels("defaultName","Element" + elementCount,"span");
  firstDiv.appendChild(text.elmnt);
  let input = new Inputs("text","inp"+elementCount,"defaultForm",false);
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

// Event listener function that creates a select form for number of radio labels.
function radioSelected(event){
  if(event.target.value == "radio") {
    let selectDrop = new Select("2","2","3","3","4","4");
    selectDrop.addName("defaultFrom");
    selectDrop.append();
    selectDrop.select.addEventListener("click",radioLabels);
    arrayOfElements.push(selectDrop.select);
  }
}

// Creates a previously selected nubmer of radio labels.
function radioLabels(event) {
  let num: number = event.target.value;
  for(var i = 0; i < num; ++i){
    let radio = new Inputs("radio","radio"+i,"radios",false);
    let label = new Inputs("text","label"+i,"defaultForm",false);
    let br: HTMLBRElement = (<HTMLBRElement>document.createElement("br"));
    firstDiv.appendChild(br);
    radio.append();
    label.append();
    arrayOfElements.push(br,radio.elmnt,label.elmnt);
  }
}


// Store the copied array of current form into a map
// and add a new option to Formulars dropdown.
function storeForm(userInput: string) {
  elementCount = 0;
  // If form existed before add new elements to it by concating previous and current array.
  let clonedArray: htmlElements[]
  if(mapOfForms.has(userInput) == true) {
    let existingArray: htmlElements[] = mapOfForms.get(userInput);
    existingArray = existingArray.concat(arrayOfElements);
    clonedArray = existingArray.slice(0);
  }
  // A new form was just created so add the option with that name to dropdown.
  else {
    var option = new Option(userInput);
    dropdown.appendChild(option);
    clonedArray = arrayOfElements.slice(0);
  }
  // Reset array so a new form can be added and store a copy of form in a map.
  arrayOfElements = [];
  mapOfForms.set(userInput,clonedArray);
  firstDiv.innerHTML = "";
  return;
}

// Search the map for the array of selected form and
// convert to form items based on user selection.
function getForm(selectedItem: string) {
  let array: htmlElements[] = (<htmlElements[]>mapOfForms.get(selectedItem));
  // Reset div so a new form can be displayed.
  formReset.innerHTML = "";
  // Loop through elements and convert them based on input, also add validation.
  for(var i = 0; i < array.length; ++i) {
    if(array[i].type == "radio") {
      let temp1 = new Inputs("radio","radios" + i,"radios",false);
      formReset.appendChild(temp1.elmnt);
    }
    if(array[i].tagName == "INPUT" && array[i].type != "radio") {
      if(array[i+1].value == "radio"){
        let temp2 = new Labels("defaultForm",array[i].value,"p");
        formReset.appendChild(temp2.elmnt);
      }
      else {
        let temp3 = new Labels("labels",array[i].value,"span");
        formReset.appendChild(temp3.elmnt);
      }
    }
    else if(array[i].tagName == "SELECT") {
      let temp4 = new Inputs(array[i].value,"inputs"+i,"defaultForm",false);
      if(array[i].value != "radio") {
        formReset.appendChild(temp4.elmnt);
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
  formReset.reportValidity();
  return;
}

// Store the user input into map and reset fields.
function submitForm() {
  let currentData = new Data();
  currentData.store(dataMap);
}



