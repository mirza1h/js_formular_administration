class Labels {
    constructor(name, content, type, elId) {
        if (type == "p")
            this.elmnt = document.createElement("p");
        else
            this.elmnt = document.createElement("span");
        this.elmnt.className = name;
        this.elmnt.textContent = content;
        this.elmnt.id = elId;
    }
}
