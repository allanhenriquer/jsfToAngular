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

  loadFile(): void {
    var file = document.getElementById("origem");
    this.readThis(file);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (e) {
      AppComponent.prototype.convMain(myReader.result);
    }
    myReader.readAsText(file);
  }

  convMain(strHtml: string): void {
<<<<<<< HEAD
=======
    
>>>>>>> motor_freitag
    console.log(strHtml);
    var strHtmlConvertido : string;
    var strTag: string;   
    var posicao: number = 0;
    var regx = /<\w{1,}:\w{1,}.*/g;
    var arrayTag: RegExpMatchArray;
    var arrayCloseTagFrom: string[];
    var arrayCloseTagTo: string[];

    arrayCloseTagFrom = ["<p:outputPanel", "<h:outputLabel", "<p:commandLink"];
    arrayCloseTagTo = ["</div>", "</label>", "</button>"];

    strHtml.replace(/\n/gm, '');
    arrayTag = strHtml.match(regx);
    strHtmlConvertido = strHtml;
    
    arrayTag.forEach(element => {
      strTag = element;
      var x : number = 1;
      arrayCloseTagFrom.forEach(element2 => {
        if (element.indexOf(element2) != -1) {
              switch (x) {
                case 1:
                  strHtmlConvertido.replace(strTag, "");
                  console.log("strTag=" + strTag);
                  console.log("convDiv=" + this.convDiv(strTag));
                  break;
                case 2:
                  //this.convLabel(strTag);
                  break;
                case 3:
                  this.convInput(strTag);
                  console.log("strTag=" + strTag);
                   console.log("convInput=" + this.convInput(strTag));
                  break;
                case 4:
                  break;
              }
        }
        x++;
      });
    });
    strHtmlConvertido.replace("<p:outputPanel","");
    console.log("Novo HTML = " + strHtmlConvertido);
  }

  convInput(html: string): string {
    return "<input type='text'>";
  }

  convDiv(html: string): string {
    return "<div>";
  }

  convButton(html: string): string {
    return "<button>";
  }

}