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
// Event listener function that creates a select form for number of radio labels.
function radioSelected(event) {
    let id = event.target.id.substr(6);
    let nextEl = document.getElementById("selectv" + id);
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
        // if(called == true)
        elementRemoval(num, temp.id);
        // let name: string = (<HTMLInputElement>document.getElementById("userInput")).value;
        // let arrayOfElements: any = mapOfForms.get(name);
        var index = arrayOfElements.findIndex(function (o) {
            return o.id === "rselect" + id;
        });
        if (index !== -1)
            arrayOfElements.splice(index, 1);
        radioAdded = false;
    }
}
var called = false;
// Creates a previously selected number of radio labels.
function radioLabels(event) {
    let el = event.target;
    called = true;
    if (el.oldValue == 0) {
        let num = el.value;
        makeElements(num, el);
    }
    else if (el.oldValue != 0 && el.oldValue != el.value) {
        elementRemoval(el.oldValue, el.id);
        makeElements(el.value, el);
    }
    el.oldValue = el.value;
}
function makeElements(num, el) {
    //let radioDiv: HTMLDivElement = document.createElement("div");
    let id = el.id;
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
    // let name: string = (<HTMLInputElement>document.getElementById("userInput")).value;
    // let arrayOfElements: any = mapOfForms.get(name);
    var index = arrayOfElements.findIndex(function (o) {
        return o.id === "br" + id + 0;
    });
    if (index !== -1)
        arrayOfElements.splice(index, num * 3);
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
