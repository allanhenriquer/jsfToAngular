import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

   loadFile($event) : void {
    console.log("era para ler o arquivo!");
    this.readThis($event.target);
    debugger;
  }

  readThis(inputValue: any) : void {
    var files:File = inputValue.files; 
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      // you can perform an action with readed data here
      console.log(myReader.result);
    }
    if (files.type !== ".xhtml") {
      myReader.readAsText(files);  
    } else {
      myReader.readAsArrayBuffer(files);
    }
    
  }
}
