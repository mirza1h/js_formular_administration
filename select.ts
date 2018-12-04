var firstDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("return");

class Select {
  select: HTMLSelectElement = (<HTMLSelectElement> document.createElement("select"));
  option1: HTMLOptionElement;
  option2: HTMLOptionElement;
  option3: HTMLOptionElement;
  oldValue: number = 0;
  oldType: string = "";
  
  constructor(opt1: string,opt1v: string,opt2: string,opt2v: string,opt3: string, opt3v: string, name: string) {
    this.select.id = name;
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

var radioAdded: boolean = false;
// Event listener function that creates a select form for number of radio labels.
function radioSelected(event) {
  let id: string = event.target.id.substr(6);
  if(event.target.value == "radio") {
    event.target.oldType = "radio";
    let selectDrop = new Select("2","2","3","3","4","4","rselect"+id);
    selectDrop.addName("defaultFrom");
    selectDrop.append();
    selectDrop.select.addEventListener("click",radioLabels);
    arrayOfElements.push(selectDrop.select);
    radioAdded = true;
  }
  else if(event.target.oldType == "radio") {
    event.target.oldType = event.target.value;
    let temp: any = document.getElementById("rselect"+id);
    let num: number = parseInt(temp.value,10);
    temp.parentNode.removeChild(temp);
    if(called == true)
      elementRemoval(num,temp.id);
    called = false;
  }
}

var called: boolean = false;
// Creates a previously selected number of radio labels.
function radioLabels(event) {
  let el: any = event.target;
  called = true;
  if(el.oldValue == 0) {
    let num: number = el.value;
    makeElements(num,el.id);
  }
  else if(el.oldValue != 0 && el.oldValue != el.value) {
    elementRemoval(el.oldValue, el.id);
    makeElements(el.value, el.id);
  }
  el.oldValue = el.value;
}

function makeElements(num: number,id: string) {
  for(var i = 0; i < num; ++i) {
    let radio = new Inputs("radio","radio"+id+i,"radios",false);
    let label = new Inputs("text","label"+id+i,"defaultForm",false);
    let br: HTMLBRElement = (<HTMLBRElement>document.createElement("br"));
    br.id = "br"+id+i;
    firstDiv.appendChild(br);
    radio.append();
    label.append();
    arrayOfElements.push(br,radio.elmnt,label.elmnt);
  }
}

function elementRemoval(num: number,id: string) {
  for(var i = 0; i < num; i++) {
    let rTemp = document.getElementById("radio"+id+i);
    rTemp.parentNode.removeChild(rTemp);
    let lTemp = document.getElementById("label"+id+i);
    lTemp.parentNode.removeChild(lTemp);
    let bTemp = document.getElementById("br"+id+i);
    bTemp.parentNode.removeChild(bTemp);
  }
  var index = arrayOfElements.findIndex(function(o){
    return o.id === "br"+id+0;})
  if (index !== -1) 
    arrayOfElements.splice(index, num*3);
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}