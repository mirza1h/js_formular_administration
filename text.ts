
class Labels {
  elmnt: HTMLElement;
  constructor(name: string,content: string,type: string){
    if(type == "p")
      this.elmnt = <HTMLParagraphElement>document.createElement("p");
     else
     this.elmnt = <HTMLParagraphElement>document.createElement("span");
    this.elmnt.className = name;
    this.elmnt.textContent = content;
  }
}