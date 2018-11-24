var firstDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("return");

class Select {
  select: HTMLSelectElement =(<HTMLSelectElement> document.createElement("select"));
  option1: HTMLOptionElement;
  option2: HTMLOptionElement;
  option3: HTMLOptionElement;
  
  constructor(opt1: string,opt1v: string,opt2: string,opt2v: string,opt3: string, opt3v: string){
    this.option1 = new Option(opt1,opt1v,false,false);
    this.option2 = new Option(opt2,opt2v,false,false);
    this.option3 = new Option(opt3,opt3v,false,false);
  }
  addName(styleName: string) {
    this.select.className = styleName;
  }
  
  append() {
    this.select.appendChild(this.option1);
    this.select.appendChild(this.option2);
    this.select.appendChild(this.option3);
    firstDiv.appendChild(this.select);
  }
}