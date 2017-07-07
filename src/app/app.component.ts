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

  convLabel(html: string): string {

    var valorTagStyle = "";
    var valorTagStyleClass = "";

    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var regxValue = /value\s*=*\s*/; //identifica value=

    var regxStyleApas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"

    var regxStyleClassApas = /styleClass\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica styleClass="conteudo"

    if (html.match(regxValueApas) != null) { //verifica se tem value

      var valorTagValue = this.pegaConteudo(html, regxValueApas, regxValue);

      if (html.match(regxStyleApas) !== null) { //verifica se tem style

        var arrStyle = regxStyleApas.exec(html);
        valorTagStyle = " " + arrStyle[0];

      }

      if (html.match(regxStyleClassApas) !== null) { //verifica se tem styleClass

        var arrStyleClass = regxStyleClassApas.exec(html);
        valorTagStyleClass = " " + arrStyleClass[0];
        valorTagStyleClass = valorTagStyleClass.replace("styleClass", "class");

      }

    }

    html = '<label' + valorTagStyle + valorTagStyleClass + '>' + valorTagValue + "</label>";
    console.log(html);

    return html;
  }

  pegaConteudo(html: string, regxToFindAspas, regxToFind): string {

    var regxEspaco = /\s/g;

    var pegaValue = regxToFind.exec(html);
    pegaValue[0] = pegaValue[0].replace(regxEspaco, "");
    var html = html.replace(regxToFind, pegaValue[0]);

    var novoRegx = regxToFindAspas.exec(html);

    var indexValue = novoRegx[0].indexOf("value");
    var sbStrValue = novoRegx[0].substring(indexValue + 7, novoRegx[0].length - 1);

    return sbStrValue;
  }

}