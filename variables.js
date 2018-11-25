var elementCount = 0;
var arrayOfElements = []; // Array used for temporary storage of every form.
var mapOfForms = new Map(); // Map used for storing forms. Keys are search inputs and arrays of form elements are values.
var dropdown = document.getElementById("existingForm");
var firstDiv = document.getElementById("return");
var formReset = document.getElementById("valid");
var dataMap = new Map(); // Map used for submiting data. Keys are labels, and values are user inputs.
class htmlElements extends HTMLElement {
}
