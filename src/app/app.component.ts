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
    debugger;
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (e) {
      AppComponent.prototype.convMain(myReader.result);
    }

    myReader.readAsText(file);
  }

  convMain(strHtml: string): void {
    console.log("entrou no metodo convMain");
    console.log(strHtml);
    var strTag: string;
    var posicao: number = 0;
    var regex:string;
    var metaTag: RegExp;
    var match: RegExpExecArray;
    var match2: RegExpMatchArray;

    //metaTag = new RegExp("<\w{1,}:\w{1,}.*");
    match2 = strHtml.match("/<\w{1,}:\w{1,}.*/g");
    match = metaTag.exec(strHtml);

    console.log("mach2=" + match2)
    console.log("mac2=" + match                                                             )
    strTag = strHtml.sub();


    switch (strTag) {
      case "input":
        this.convInput(strTag);
        console.log('Final de switch - input');
        break;
      case "label":
        this.convLabel(strTag);
        break;
      case "div":
        this.convDiv(strTag);
        break;
      case "button":
        break;

    }
  }

  convInput(html: string): string {
    console.log('antes');
    return html && html.replace('p:outputPanel', 'teste');
  }

  convLabel(html: string): string {
    return "";
  }

  convDiv(html: string): string {
    return "";
  }

  convButton(html: string): string {
    return "";
  }
}
