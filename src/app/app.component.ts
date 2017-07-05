import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   public fileString;

    constructor() {
        this.fileString;
    }

    changeListener($event): void {
            this.readThis($event.target);
        }

    readThis(inputValue: any): void {
        // var file: File = inputValue.files[0];
        var files : File[] = inputValue.files;
        var myReader: FileReader = new FileReader();
        var fileType = inputValue.parentElement.id;
        myReader.onloadend = function (e) {
            //myReader.result is a String of the uploaded file
            // console.log(myReader.result);
            
            //fileString = myReader.result would not work, 
            //because it is not in the scope of the callback
        }

        files.forEach(element => {
          myReader.readAsText(element);
          this.convMain(myReader.result);
        });
        
      //  myReader.readAsText(file);
      //  this.convMain(myReader.result);
    }

    convMain(strHtml : string) : void {
      debugger;
      var strTag : string;
      var posicao : number = 0;
      // var strHtml : string;
      
    
      switch (strTag) {
        case "input" : 
          this.convInput(strHtml);
          break;
        case "label" : 
          this.convLabel(strHtml);
          break;
        case "div" : 
          this.convDiv(strHtml);
          break;
        case "button" :
          break; 
       
      }
    } 	

    convInput(html : string) : string {
      return "";
    }

    convLabel(html : string) : string {
      return "";
    }

    convDiv(html : string) : string {
      return "";
    }

    convButton(html : string) : string {
      return "";
    }
}
