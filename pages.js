class Page {
    constructor() {
        this.tabcontent = document.getElementsByClassName("tabcontent");
        this.tablinks = document.getElementsByClassName("tablink");
        this.color = "white";
        this.tabcontent[0].style.display = "none";
        this.tabcontent[1].style.display = "none";
        this.tablinks[0].style.backgroundColor = "";
        this.tablinks[1].style.backgroundColor = "";
    }
    colorTab(elmnt) {
        elmnt.style.backgroundColor = this.color;
    }
    switchPage(page) {
        page.style.display = "block";
    }
}
// Switch between pages and color tabs.
function openPage(pageName, elmnt) {
    let page = document.getElementById(pageName);
    let currentPage = new Page();
    currentPage.switchPage(page);
    currentPage.colorTab(elmnt);
}
document.getElementById("defaultOpen").click();
