class Page {
  tabcontent: HTMLCollectionOf<HTMLDivElement> = (<HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("tabcontent"));
  tablinks: HTMLCollectionOf<HTMLDivElement> = (<HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("tablink"));
  color: string = "white";
  constructor() {
    this.tabcontent[0].style.display = "none";
    this.tabcontent[1].style.display = "none";
    this.tablinks[0].style.backgroundColor = "";
    this.tablinks[1].style.backgroundColor = "";
  }  
  colorTab(elmnt: HTMLDivElement) {
    elmnt.style.backgroundColor = this.color;
  }
    // Show the specific tab content.
  switchPage(page: HTMLDivElement) {
    page.style.display = "block";
  }
}
// Switch between pages and color tabs.
function openPage(pageName: string, elmnt: HTMLDivElement) {
  let page = <HTMLDivElement>document.getElementById(pageName);
  let currentPage = new Page();
  currentPage.switchPage(page);
  currentPage.colorTab(elmnt);
}
document.getElementById("defaultOpen").click();