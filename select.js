var firstDiv = document.getElementById("return");
class Select {
    constructor(opt1, opt1v, opt2, opt2v, opt3, opt3v) {
        this.select = document.createElement("select");
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
// Event listener function that creates a select form for number of radio labels.
function radioSelected(event) {
    if (event.target.value == "radio") {
        let selectDrop = new Select("2", "2", "3", "3", "4", "4");
        selectDrop.addName("defaultFrom");
        selectDrop.append();
        selectDrop.select.addEventListener("click", radioLabels);
        arrayOfElements.push(selectDrop.select);
    }
}
// Creates a previously selected nubmer of radio labels.
function radioLabels(event) {
    let num = event.target.value;
    for (var i = 0; i < num; ++i) {
        let radio = new Inputs("radio", "radio" + i, "radios", false);
        let label = new Inputs("text", "label" + i, "defaultForm", false);
        let br = document.createElement("br");
        firstDiv.appendChild(br);
        radio.append();
        label.append();
        arrayOfElements.push(br, radio.elmnt, label.elmnt);
    }
}
