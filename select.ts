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
// Event listener function that creates a select form for number of radio labels.
function radioSelected(event){
  if(event.target.value == "radio") {
    let selectDrop = new Select("2","2","3","3","4","4");
    selectDrop.addName("defaultFrom");
    selectDrop.append();
    selectDrop.select.addEventListener("click",radioLabels);
    arrayOfElements.push(selectDrop.select);
  }
}

// Creates a previously selected nubmer of radio labels.
function radioLabels(event) {
  let num: number = event.target.value;
  for(var i = 0; i < num; ++i){
    let radio = new Inputs("radio","radio"+i,"radios",false);
    let label = new Inputs("text","label"+i,"defaultForm",false);
    let br: HTMLBRElement = (<HTMLBRElement>document.createElement("br"));
    firstDiv.appendChild(br);
    radio.append();
    label.append();
    arrayOfElements.push(br,radio.elmnt,label.elmnt);
  }
}