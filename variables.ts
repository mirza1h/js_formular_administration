var elementCount: number = 0;
var arrayOfElements: htmlElements[] = []; // Array used for temporary storage of every form.
var mapOfForms: Map<string,htmlElements[]>= new Map<string,Array<HTMLElement>>(); // Map used for storing forms. Keys are search inputs and arrays of form elements are values.
var dropdown: HTMLSelectElement = <HTMLSelectElement> document.getElementById("existingForm");
var firstDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("return");
var formReset: HTMLFormElement = <HTMLFormElement>document.getElementById("valid");
var dataMap: Map<string,string> = new Map<string,string>();  // Map used for submiting data. Keys are labels, and values are user inputs.
class htmlElements extends HTMLElement {
  value?: any;
  type?: any;
}