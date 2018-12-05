var firstDiv = document.getElementById("return");
class Select {
    constructor(opt1, opt1v, opt2, opt2v, opt3, opt3v, name) {
        this.select = document.createElement("select");
        this.select.id = name;
        this.option1 = new Option(opt1, opt1v, false, false);
        this.option2 = new Option(opt2, opt2v, false, false);
        this.option3 = new Option(opt3, opt3v, false, false);
        this.select.appendChild(this.option1);
        this.select.appendChild(this.option2);
        this.select.appendChild(this.option3);
    }
    addName(styleName) {
        this.select.className = styleName;
    }
    append() {
        firstDiv.appendChild(this.select);
    }
}
var radioAdded = false;
// Event listener function that creates a select form.
function radioSelected(event) {
    let id = event.target.id.substr(6);
    let oldType = event.target.getAttribute("oldType");
    let nextEl = document.getElementById("selectv" + id);
    if (event.target.value == "radio") {
        event.target.setAttribute("oldType", "radio");
        let selectDrop = new Select("2", "2", "3", "3", "4", "4", "rselect" + id);
        selectDrop.select.setAttribute("oldValue", "0");
        selectDrop.addName("defaultFrom");
        selectDrop.select.addEventListener("click", radioLabels);
        insertAfter(selectDrop.select, nextEl);
        // Needs to be inserted into array at specific index, in case of nonlinear option changing.
        let idx = arrayOfElements.findIndex(function (o) {
            return o.id === "selectv" + id;
        });
        arrayOfElements.splice(idx + 1, 0, selectDrop.select);
        radioAdded = true;
    } // If we changed option from radio to other option, remove dynamically added elements.
    else if (oldType == "radio") {
        event.target.setAttribute("oldType", event.target.value);
        let temp = document.getElementById("rselect" + id);
        let num = parseInt(temp.value, 10);
        temp.parentNode.removeChild(temp);
        elementRemoval(num, temp.id);
        // When editing, operate on that form's array, not the global one.
        if (edit == true) {
            let name = document.getElementById("userInput").value;
            let arrayOfElements = mapOfForms.get(name);
            let index = arrayOfElements.findIndex(function (o) {
                return o.id == "rselect" + id;
            });
            if (index !== -1)
                arrayOfElements.splice(index, 1);
        }
        let index = arrayOfElements.findIndex(function (o) {
            return o.id === "rselect" + id;
        });
        if (index !== -1)
            arrayOfElements.splice(index, 1);
        radioAdded = false;
    }
}
// Creates a previously selected number of radio labels.
function radioLabels(event) {
    let el = event.target;
    let oldValue = el.getAttribute("oldValue");
    // Creating labels for the first time.
    if (oldValue == 0) {
        let num = el.value;
        makeElements(num, el);
    } //Editing number of labels.
    else if (oldValue != 0 && oldValue != el.value) {
        elementRemoval(oldValue, el.id);
        makeElements(el.value, el);
    }
    el.setAttribute("oldValue", el.value);
}
// Crates chosen number of radio labels, also used for editing them.
function makeElements(num, el) {
    let id = el.id;
    let radioDiv = document.createElement("div");
    radioDiv.id = "rdiv" + id;
    insertAfter(radioDiv, el);
    let idx = arrayOfElements.findIndex(function (o) {
        return o.id == id;
    });
    for (var i = 0; i < num; ++i) {
        let radio = new Inputs("radio", "radio" + id + i, "radios", false);
        let label = new Inputs("text", "label" + id + i, "defaultForm", false);
        let br = document.createElement("br");
        br.id = "br" + id + i;
        radioDiv.appendChild(br);
        radioDiv.appendChild(radio.elmnt);
        radioDiv.appendChild(label.elmnt);
        // Need to be inserted into array at specific index, in case of nonlinear option changing.
        arrayOfElements.splice(idx + 1, 0, br);
        arrayOfElements.splice(idx + 2, 0, radio.elmnt);
        arrayOfElements.splice(idx + 3, 0, label.elmnt);
        idx += 3;
    }
}
// Remove radio labels by deleting their parent node, or by individualy removing them, when form is edited.
function elementRemoval(num, id) {
    if (edit == false) {
        let dTemp = document.getElementById("rdiv" + id);
        dTemp.parentNode.removeChild(dTemp);
    }
    if (edit == true) {
        for (var i = 0; i < num; i++) {
            let rTemp = document.getElementById("radio" + id + i);
            rTemp.parentNode.removeChild(rTemp);
            let lTemp = document.getElementById("label" + id + i);
            lTemp.parentNode.removeChild(lTemp);
            let bTemp = document.getElementById("br" + id + i);
            bTemp.parentNode.removeChild(bTemp);
        } // Also remove them from form's array.
        let name = document.getElementById("userInput").value;
        let arrayOfElements = mapOfForms.get(name);
        let index = arrayOfElements.findIndex(function (o) {
            return o.id === "br" + id + 0;
        });
        if (index !== -1)
            arrayOfElements.splice(index, num * 3);
    }
    let index = arrayOfElements.findIndex(function (o) {
        return o.id === "br" + id + 0;
    });
    if (index !== -1)
        arrayOfElements.splice(index, num * 3);
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function removeFromArray(array, id, n_elements) {
    let index = array.findIndex(function (o) {
        return o.id === id;
    });
    if (index !== -1)
        array.splice(index, n_elements);
}
