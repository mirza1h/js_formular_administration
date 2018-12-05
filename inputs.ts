var firstDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("return");

class Inputs {
  elmnt: HTMLInputElement = (<HTMLInputElement> document.createElement("input"));
  
  constructor(elmntType: string,elmntId: string,styleName: string,state: boolean){
    this.elmnt.type = elmntType;
    this.elmnt.id = elmntId;
    this.elmnt.className = styleName;
    this.elmnt.required = state;
    this.elmnt.name = "nesto";
  }
  append() {
    firstDiv.appendChild(this.elmnt);
  }
}