var formReset: HTMLFormElement = <HTMLFormElement>document.getElementById("valid");
var inputMap: Map<string,string[]> = new Map<string,string[]>();
var versionField: HTMLInputElement = (<HTMLInputElement>document.getElementById("version"));

class Data {
  inpObj: HTMLCollectionOf<HTMLInputElement> = formReset.getElementsByTagName("input");
  spanObj: HTMLCollectionOf<HTMLSpanElement> = <HTMLCollectionOf<HTMLSpanElement>>formReset.getElementsByClassName("labels");
  
  // Store form fields and inputs in a map as data, also load inputs under chosen version to current form.
  store (dataMap: any,load: boolean) {
    let vers: string = versionField.value;
    let formName: string = (<HTMLInputElement>document.getElementById("existingForm")).value;
    if(load == false) {
      let arrayOfInputs: string[] = [];
      if(this.validation(this.inpObj) == 1) {
        for(var i = 0; i < this.spanObj.length; ++i) {
          if(this.inpObj[i].value == "on" && this.inpObj[i].checked == false)
            this.inpObj[i].value = "off";
          if(this.inpObj[i].checked == true)
            this.inpObj[i].value = "on";
          // All data is being stored.
          console.log(this.spanObj[i].textContent,this.inpObj[i].value);
          dataMap.set(this.spanObj[i].textContent,this.inpObj[i].value);
          // Inputs are stored, so they can be used for versions.
          arrayOfInputs.push(this.inpObj[i].value);
        }
        formReset.reset();
        alert("Data submitted under version: " + vers);
      }
      inputMap.set(formName+vers,arrayOfInputs);
    }// Load array of inputs for that form, and apply them to form.
    else if(load == true) {
      let array: string[] = inputMap.get(formName+vers);
      if(array == undefined) {
        alert("Version doesn't exist!");
        return;
      }
      for(var i = 0; i < array.length;i++) {
        if(array[i] == "on")
          this.inpObj[i].checked = true;
        this.inpObj[i].value = array[i];
      }
      alert(formName + " version " + vers + " loaded!");
      versionField.value = "0";
    } 
}

    // Check for empty inputs and focus on them.
  validation(inputs: HTMLCollectionOf<HTMLInputElement>) {
    let empty: number = 0;
    for(var i = 0;i < inputs.length; ++i) {
      if(inputs[i].type == "text" && inputs[i].required == true && inputs[i].value == "") {
        ++empty;
        inputs[i].focus();
      }
      if(inputs[i].type == "checkbox" && inputs[i].required == true && inputs[i].checked == false) {
        ++empty;
        inputs[i].focus();
      }
    }
    if(empty != 0) {
      alert("Fill out mandatory fields!");
      return 0;
    }
    else
      return 1;
    }
}
