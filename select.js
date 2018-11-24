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
