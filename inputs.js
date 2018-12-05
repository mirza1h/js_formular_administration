var firstDiv = document.getElementById("return");
class Inputs {
    constructor(elmntType, elmntId, styleName, state) {
        this.elmnt = document.createElement("input");
        this.elmnt.type = elmntType;
        this.elmnt.id = elmntId;
        this.elmnt.className = styleName;
        this.elmnt.required = state;
        if (elmntType == "radio")
            this.elmnt.value = "off";
    }
    append() {
        firstDiv.appendChild(this.elmnt);
    }
}
