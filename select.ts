var firstDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("return");

class Select {
  select: HTMLSelectElement = (<HTMLSelectElement> document.createElement("select"));
  option1: HTMLOptionElement;
  option2: HTMLOptionElement;
  option3: HTMLOptionElement;
  
  constructor(opt1: string,opt1v: string,opt2: string,opt2v: string,opt3: string, opt3v: string, name: string) {
    this.select.id = name;
    this.option1 = new Option(opt1,opt1v,false,false);
    this.option2 = new Option(opt2,opt2v,false,false);
    this.option3 = new Option(opt3,opt3v,false,false);
    this.select.appendChild(this.option1);
    this.select.appendChild(this.option2);
    this.select.appendChild(this.option3);
  }
  addName(styleName: string) {
    this.select.className = styleName;
  }
  append() {
    firstDiv.appendChild(this.select);
  }
}

var radioAdded: boolean = false;
// Event listener function that creates a select form.
function radioSelected(event) {
  let id: string = event.target.id.substr(6);
  let oldType: string = event.target.getAttribute("oldType");
  let nextEl: any = document.getElementById("selectv"+id);
  if(event.target.value == "radio") {
    event.target.setAttribute("oldType","radio");
    let selectDrop = new Select("2","2","3","3","4","4","rselect"+id);
    selectDrop.select.setAttribute("oldValue","0");
    selectDrop.addName("defaultFrom");
    selectDrop.select.addEventListener("click",radioLabels);
    insertAfter(selectDrop.select,nextEl);
    // Needs to be inserted into array at specific index, in case of nonlinear option changing.
    let idx = arrayOfElements.findIndex(function(o){
      return o.id === "selectv"+id;});
    arrayOfElements.splice(idx+1, 0 ,selectDrop.select);
    radioAdded = true;
  }// If we changed option from radio to other option, remove dynamically added elements.
  else if(oldType == "radio") {
    event.target.setAttribute("oldType",event.target.value);
    let temp: any = document.getElementById("rselect"+id);
    let num: number = parseInt(temp.value,10);
    temp.parentNode.removeChild(temp);
    elementRemoval(num,temp.id);
    // When editing, operate on that form's array, not the global one.
    if(edit == true) {
      let name: string = (<HTMLInputElement>document.getElementById("userInput")).value;
      let arrayOfElements: any = mapOfForms.get(name);
      let index = arrayOfElements.findIndex(function(o){
      return o.id == "rselect"+id;})
      if (index !== -1) 
        arrayOfElements.splice(index,1);
      }
    let index = arrayOfElements.findIndex(function(o){
    return o.id === "rselect"+id;})
    if (index !== -1) 
      arrayOfElements.splice(index,1);
    radioAdded = false;
  }
}

// Creates a previously selected number of radio labels.
function radioLabels(event) {
  let el: any = event.target;
  let oldValue = el.getAttribute("oldValue");
  // Creating labels for the first time.
  if(oldValue == 0) {
    let num: number = el.value;
    makeElements(num,el);
  }//Editing number of labels.
  else if(oldValue != 0 && oldValue != el.value) {
    elementRemoval(oldValue, el.id);
    makeElements(el.value, el);
  }
  el.setAttribute("oldValue",el.value);
}
// Crates chosen number of radio labels, also used for editing them.
function makeElements(num: number,el: any) {
  let id: string = el.id;
  let radioDiv: HTMLDivElement = document.createElement("div");
  radioDiv.id = "rdiv"+id;
  insertAfter(radioDiv,el);
  let idx = arrayOfElements.findIndex(function(o){
    return o.id == id;});
  for(var i = 0; i < num; ++i) {
    let radio = new Inputs("radio","radio"+id+i,"radios",false);
    let label = new Inputs("text","label"+id+i,"defaultForm",false);
    let br: HTMLBRElement = (<HTMLBRElement>document.createElement("br"));
    br.id = "br"+id+i;
    radioDiv.appendChild(br);
    radioDiv.appendChild(radio.elmnt);
    radioDiv.appendChild(label.elmnt);
    // Need to be inserted into array at specific index, in case of nonlinear option changing.
    arrayOfElements.splice(idx+1, 0 ,br);
    arrayOfElements.splice(idx+2, 0 ,radio.elmnt);
    arrayOfElements.splice(idx+3, 0 ,label.elmnt);
    idx+=3;
  }
}
// Remove radio labels by deleting their parent node, or by individualy removing them, when form is edited.
function elementRemoval(num: number,id: string) {
  if(edit == false) {
    let dTemp = document.getElementById("rdiv"+id);
    dTemp.parentNode.removeChild(dTemp);
  }
  if(edit == true){
    for(var i = 0; i < num; i++) {
      let rTemp = document.getElementById("radio"+id+i);
      rTemp.parentNode.removeChild(rTemp);
      let lTemp = document.getElementById("label"+id+i);
      lTemp.parentNode.removeChild(lTemp);
      let bTemp = document.getElementById("br"+id+i);
      bTemp.parentNode.removeChild(bTemp);
    }// Also remove them from form's array.
    let name: string = (<HTMLInputElement>document.getElementById("userInput")).value;
    let arrayOfElements: any = mapOfForms.get(name);
    let index = arrayOfElements.findIndex(function(o){
      return o.id === "br"+id+0;})
    if (index !== -1) 
      arrayOfElements.splice(index, num*3);
    }
    let index = arrayOfElements.findIndex(function(o){
    return o.id === "br"+id+0;})
    if (index !== -1) 
      arrayOfElements.splice(index, num*3);
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function removeFromArray(array: any, id: string, n_elements: number){
  let index = array.findIndex(function(o){
    return o.id === id;})
  if (index !== -1) 
    array.splice(index, n_elements);
}