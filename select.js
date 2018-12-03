var firstDiv = document.getElementById("return");
class Select {
    constructor(opt1, opt1v, opt2, opt2v, opt3, opt3v, name) {
        this.select = document.createElement("select");
        this.oldValue = 0;
        this.oldType = "";
        this.select.id = name;
        this.option1 = new Option(opt1, opt1v, false, false);
        this.option2 = new Option(opt2, opt2v, false, false);
        this.option3 = new Option(opt3, opt3v, false, false);
    }
    addName(styleName) {
        this.select.className = styleName;
    }
    append() {
        this.select.appendChild(this.option1);
        this.select.appendChild(this.option2);
        this.select.appendChild(this.option3);
        firstDiv.appendChild(this.select);
    }
}
var radioAdded = false;
// Event listener function that creates a select form for number of radio labels.
function radioSelected(event) {
    let id = event.target.id.substr(6);
    if (event.target.value == "radio") {
        event.target.oldType = "radio";
        let selectDrop = new Select("2", "2", "3", "3", "4", "4", "rselect" + id);
        selectDrop.addName("defaultFrom");
        selectDrop.append();
        selectDrop.select.addEventListener("click", radioLabels);
        arrayOfElements.push(selectDrop.select);
        radioAdded = true;
    }
    else if (event.target.oldType == "radio") {
        event.target.oldType = event.target.value;
        let temp = document.getElementById("rselect" + id);
        let num = parseInt(temp.value, 10);
        temp.parentNode.removeChild(temp);
        if (called == true)
            elementRemoval(num, temp.id);
        called = false;
    }
}
var called = false;
// Creates a previously selected number of radio labels.
function radioLabels(event) {
    called = true;
    if (event.target.oldValue == 0) {
        let num = event.target.value;
        makeElements(num, event.target.id);
    }
    else if (event.target.oldValue != 0 && event.target.oldValue != event.target.value) {
        elementRemoval(event.target.oldValue, event.target.id);
        makeElements(event.target.value, event.target.id);
    }
    event.target.oldValue = event.target.value;
}
function makeElements(num, id) {
    for (var i = 0; i < num; ++i) {
        let radio = new Inputs("radio", "radio" + id + i, "radios", false);
        let label = new Inputs("text", "label" + id + i, "defaultForm", false);
        let br = document.createElement("br");
        br.id = "br" + id + i;
        firstDiv.appendChild(br);
        radio.append();
        label.append();
        arrayOfElements.push(br, radio.elmnt, label.elmnt);
    }
}
function elementRemoval(num, id) {
    for (var i = 0; i < num; i++) {
        let rTemp = document.getElementById("radio" + id + i);
        rTemp.parentNode.removeChild(rTemp);
        let lTemp = document.getElementById("label" + id + i);
        lTemp.parentNode.removeChild(lTemp);
        let bTemp = document.getElementById("br" + id + i);
        bTemp.parentNode.removeChild(bTemp);
    }
    var index = arrayOfElements.findIndex(function (o) {
        return o.id === "br" + id + 0;
    });
    if (index !== -1)
        arrayOfElements.splice(index, num * 3);
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
