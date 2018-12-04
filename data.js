var formReset = document.getElementById("valid");
var inputMap = new Map();
var versionField = document.getElementById("version");
class Data {
    constructor() {
        this.inpObj = formReset.getElementsByTagName("input");
        this.spanObj = formReset.getElementsByClassName("labels");
    }
    // Store form fields and inputs in a map as data, also load inputs under chosen version to current form.
    store(dataMap, load) {
        let vers = versionField.value;
        let formName = document.getElementById("existingForm").value;
        if (load == false) {
            let arrayOfInputs = [];
            if (this.validation(this.inpObj) == 1) {
                for (var i = 0; i < this.spanObj.length; ++i) {
                    if (this.inpObj[i].value == "on" && this.inpObj[i].checked == false)
                        this.inpObj[i].value = "off";
                    console.log(this.spanObj[i].textContent, this.inpObj[i].value);
                    dataMap.set(this.spanObj[i].textContent, this.inpObj[i].value);
                    arrayOfInputs.push(this.inpObj[i].value);
                }
                formReset.reset();
                alert("Data submitted under version: " + vers);
            }
            inputMap.set(formName + vers, arrayOfInputs);
        }
        else if (load == true) {
            let array = inputMap.get(formName + vers);
            if (array == undefined) {
                alert("Version doesn't exist!");
                return;
            }
            for (var i = 0; i < array.length; i++) {
                if (array[i] == "on")
                    this.inpObj[i].checked = true;
                this.inpObj[i].value = array[i];
            }
            alert(formName + " version " + vers + " loaded!");
            versionField.value = "0";
        }
    }
    // Check for empty inputs and focus on them.
    validation(inputs) {
        let empty = 0;
        for (var i = 0; i < inputs.length; ++i) {
            if (inputs[i].required == true && (inputs[i].value == "" || inputs[i].value == "off")) {
                ++empty;
                inputs[i].focus();
            }
        }
        if (empty != 0) {
            alert("Fill out mandatory fields!");
            return 0;
        }
        else
            return 1;
    }
}
