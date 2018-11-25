var formReset: HTMLFormElement = <HTMLFormElement>document.getElementById("valid");

class Data{
  inpObj: HTMLCollectionOf<HTMLInputElement> = formReset.getElementsByTagName("input");
  spanObj: HTMLCollectionOf<HTMLSpanElement> = <HTMLCollectionOf<HTMLSpanElement>>formReset.getElementsByClassName("labels");
  store (dataMap: any){
    if(this.validation(this.inpObj) == 1) {
      for(var i = 0; i < this.spanObj.length; ++i) {
        if(this.inpObj[i].value == "on" && this.inpObj[i].checked == false)
          this.inpObj[i].value = "off";
          console.log(this.spanObj[i].textContent,this.inpObj[i].value);
          dataMap.set(this.spanObj[i].textContent,this.inpObj[i].value);
      }
    formReset.reset();
    window.alert("Data submitted!");
  }
  }

    // Check for empty inputs and focus on them.
  validation(inputs: HTMLCollectionOf<HTMLInputElement>){
  let empty: number = 0;
  for(var i = 0;i < inputs.length; ++i) {
    if(inputs[i].required == true && (inputs[i].value == "" || inputs[i].checked == false)) {
      ++empty;
      alert("Fill out mandatory fields!");
      inputs[i].focus();
    }
  }
  if(empty != 0)
    return 0;
  else
    return 1;
}

}
