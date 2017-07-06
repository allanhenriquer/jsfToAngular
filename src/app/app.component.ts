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
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = function (e) {
      //myReader.result is a String of the uploaded file
      console.log(myReader.result);

      //fileString = myReader.result would not work, 
      //because it is not in the scope of the callback
    }

    myReader.readAsText(file);
    this.convMain(myReader.result);
  }

  convMain(strHtml: string): void {
    debugger;
    var strTag: string;
    var posicao: number = 0;
    var strHtml: string;


    switch (strTag) {
      case "input":
        this.convInput(strHtml);
        break;
      case "label":
        this.convLabel(strHtml);
        break;
      case "div":
        this.convDiv(strHtml);
        break;
      case "button":
        break;

    }
  }

  convInput(html: string): string {
    return "";
  }

  convLabel(html: string): string {

    html = "<h:outputText   value = 'diego righi'></h:outputtext>"

    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"

    if (html.match(regxValueApas) != null) { //verifica se tem value

      var valorTagValue = this.pegarValue(html);

      var tagCorreta = "<label>" + valorTagValue + "</label>"

      console.log(tagCorreta);

      var regxStyleApas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"

      if (html.match(regxStyleApas) != null) { //verifica se tem style



      } else {

      }

    } else {

      console.log("<label>" + "</label>");

    }
    return "";
  }

  pegarValue(html: string): string {

    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var regxValue = /value\s*=*\s*/; //identifica apenas o value=
    var regxEspaco = /\s/g;

    var pegaValue = regxValue.exec(html);
    pegaValue[0] = pegaValue[0].replace(regxEspaco, "");
    var html = html.replace(regxValue, pegaValue[0]);

    var novoRegx = regxValueApas.exec(html);
    var indexValue = novoRegx[0].indexOf("value");
    var sbStrValue = novoRegx[0].substring(indexValue + 7, novoRegx[0].length - 1);

    return sbStrValue;
  }

  convDiv(html: string): string {
    return "";
  }

  convButton(html: string): string {
    return "";
  }
}
