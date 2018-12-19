function searchForm(userInput) {
    if (userInput == "") {
        alert("Please enter some text to search");
        return;
    }
    // If form doesn't exists inside map create a new one under that name.
    let array = mapOfForms.get(userInput);
    if (array == undefined) {
        alert("Form doesn't exist. Create a form: " + userInput);
        document.getElementById("add").style.display = "block";
        createDefaultForm();
        edit = false;
        radioAdded = 0;
        return;
    }
    // Reset page, so a new form can be displayed.
    edit = true;
    firstDiv.innerHTML = "";
    let lastNumber;
    for (var i = 0; i < array.length; i++) {
        if (array[i].tagName == "DIV")
            continue;
        firstDiv.appendChild(array[i]);
        if (array[i].tagName == "SPAN")
            lastNumber = array[i].textContent;
    }
    // Restore number of elements in form in case of editing.
    elementCount = parseInt(lastNumber.substr(8), 10);
    return;
}
var version = 0;
// Creates default form elements after invalid search, and adds more fields.
function createDefaultForm() {
    edit = false;
    let br = document.createElement("br");
    firstDiv.appendChild(br);
    ++elementCount;
    let text = new Labels("defaultForm", "Element " + elementCount, "span", "el" + elementCount);
    firstDiv.appendChild(text.elmnt);
    let input = new Inputs("text", "inp " + elementCount, "defaultForm", false);
    input.append();
    let selectDrop1 = new Select("Textbox", "input", "Checkbox", "checkbox", "Radio", "radio", "select" + elementCount);
    selectDrop1.select.addEventListener("change", radioSelected);
    selectDrop1.addName("defaultForm");
    selectDrop1.append();
    selectDrop1.select.setAttribute("oldType", " ");
    let selectDrop2 = new Select("Mandatory", "true", "None", "false", "Number", "number", "selectv" + elementCount);
    selectDrop2.addName("defaultForm");
    selectDrop2.append();
    arrayOfElements.push(br, text.elmnt, input.elmnt, selectDrop1.select, selectDrop2.select);
    return;
}
var edit = false;
// Store the copied array of current form into a map and add a new option to Formulars dropdown.
function storeForm(userInput) {
    elementCount = 0;
    // If form existed before add new elements to it by concating previous and current array.
    let clonedArray;
    if (mapOfForms.has(userInput) == true) {
        let existingArray = mapOfForms.get(userInput);
        existingArray = existingArray.concat(arrayOfElements);
        clonedArray = existingArray.slice(0);
    }
    else {
        var option = new Option(userInput);
        dropdown.appendChild(option);
        clonedArray = arrayOfElements.slice(0);
    }
    arrayOfElements = [];
    mapOfForms.set(userInput, clonedArray);
    firstDiv.innerHTML = "";
    edit = true;
    return;
}
var radioLabel = [];
// Search the map for the array of selected form and convert to form items based on user selection.
function getForm(selectedItem) {
    let array = mapOfForms.get(selectedItem);
    if (array == undefined) {
        alert("No form under that name!");
        return;
    }
    let countRL = 0;
    formReset.innerHTML = "";
    // Loop through elements and convert them based on input, also add validation.
    for (var i = 0; i < array.length; ++i) {
        if (array[i].type == "radio") {
            let temp1 = new Inputs("radio", "radios" + i, "radios", false);
            formReset.appendChild(temp1.elmnt);
        }
        if (array[i].tagName == "INPUT" && array[i].type != "radio") {
            let temp3 = new Labels("labels", array[i].value, "span", array[i].id);
            formReset.appendChild(temp3.elmnt);
        }
        else if (array[i].tagName == "SELECT") {
            let temp4 = new Inputs(array[i].value, "inputs" + i, "defaultForm", false);
            if (array[i].value != "radio") {
                formReset.appendChild(temp4.elmnt);
            }
            if (array[i].value == "radio") {
                radioLabel[countRL++] = array[i - 1].id;
            }
            if (array[i + 1].value == "true") {
                temp4.elmnt.required = true;
            }
            else if (array[i + 1].value == "number") {
                if (temp4.elmnt.type == "text")
                    temp4.elmnt.type = "number";
                temp4.elmnt.required = true;
            }
            if (array[i].value == "radio")
                i += 2;
            else
                ++i;
        }
        else if (array[i].tagName == "BR") {
            var temp = document.createElement("br");
            formReset.appendChild(temp);
        }
    }
    // Ignore radio parent label when storing data.
    if (radioAdded > 0) {
        for (var i = 0; i < radioLabel.length; i++)
            document.getElementById(radioLabel[i]).className = "defaultForm";
    }
    formReset.reportValidity();
    return;
}
// Store and load data mechanism.
function submitForm(load) {
    let currentData = new Data();
    currentData.store(dataMap, load);
}
