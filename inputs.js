var firstDiv = document.getElementById("return");
class Inputs {
    constructor(elmntType, elmntId, styleName) {
        this.elmnt = document.createElement("input");
        this.elmnt.type = elmntType;
        this.elmnt.id = elmntId;
        this.elmnt.className = styleName;
    }
    append() {
        firstDiv.appendChild(this.elmnt);
    }
}
