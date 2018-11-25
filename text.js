class Labels {
    constructor(name, content, type) {
        if (type == "p")
            this.elmnt = document.createElement("p");
        else
            this.elmnt = document.createElement("span");
        this.elmnt.className = name;
        this.elmnt.textContent = content;
    }
}
