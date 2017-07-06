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
        var file: File = inputValue.files[0];
        // var files : File[] = inputValue.files;
        var myReader: FileReader = new FileReader();
        var fileType = inputValue.parentElement.id;
        myReader.onloadend = function (e) {
            console.log(myReader.result);
        }

        // files.forEach(element => {
        //   myReader.readAsText(element);
        //   this.convMain(myReader.result);
        // });
        
       myReader.readAsText(file);
       this.convMain(myReader.result);
       console.log("passei aqui!");
    }

    convMain(strHtml : string) : void {
      debugger;
      var strTag : string;
      var posicao : number = 0;
      // var strHtml : string;
      
    
      switch (strTag) {
        case "input" : 
          this.convInput(strHtml);
          console.log('depois');
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
      console.log('antes');
      return html && html.replace('p:outputPanel', 'teste');
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
