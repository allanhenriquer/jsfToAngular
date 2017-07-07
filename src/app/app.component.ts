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

    // console.log(strHtml);
    var strHtmlConvertido : string;
    var strTag: string;   
    var posicao: number = 0;
    var regx = /<\w{1,}:\w{1,}\s.*/g;
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
              // console.log(ele);
              switch (x) {
                case 1:
                  strHtmlConvertido.replace(strTag, "");
                  console.log("strTag=" + strTag);
                  // console.log("convDiv=" + this.convDiv(strTag));
                  break;
                case 2:
                  this.convLabel(strTag);
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

  convButton(html: string): string {
    return "<button>";
  }

  convLabel(html: string): string {

    var valorTagStyle = "";
    var valorTagStyleClass = "";
    var valorTagId = "";

    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var regxValue = /value\s*=*\s*/; //identifica value=

    var regxStyleAspas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"

    var regxIdAspas = /id\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica id="conteudo"

    var regxStyleClassApas = /styleClass\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica styleClass="conteudo"

    if (html.match(regxValueApas) != null) { //verifica se tem value

      var valorTagValue = this.pegaConteudo(html, regxValueApas, regxValue);

      if (html.match(regxStyleAspas) !== null) { //verifica se tem style

        var arrStyle = regxStyleAspas.exec(html);
        valorTagStyle = " " + arrStyle[0];

      }

      if (html.match(regxStyleClassApas) !== null) { //verifica se tem styleClass

        var arrStyleClass = regxStyleClassApas.exec(html);
        valorTagStyleClass = " " + arrStyleClass[0];
        valorTagStyleClass = valorTagStyleClass.replace("styleClass", "class");

      }

      if (html.match(regxIdAspas) !== null) { //verifica se tem id

        var arrId = regxIdAspas.exec(html);
        valorTagId = " " + arrId[0];

      }

    }

    html = '<label' + valorTagStyle + valorTagStyleClass + valorTagId + '>' + valorTagValue;
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

  convInput(html: string): string {

    var regxInputText = /p:inputText\s*/; //identifica p:inputText
    var regxRendered = /rendered\s*=*\s*/;
    var regxBinding = /\s*binding\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxConverter = /\s*converter\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxImmediate = /\s*immediate\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxValidator = /\s*validator\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxStyleClass = /styleClass\s*=*\s*/;

    html = html.replace(regxInputText,"input ");

    if(html.search(regxRendered) || html.search(regxBinding) || html.search(regxConverter) ||
    html.search(regxImmediate) || html.search(regxValidator) || regxStyleClass !== null){
      
      html = html.replace(regxRendered,"*ngIf=");
      html = html.replace(regxBinding,"");
      html = html.replace(regxConverter,"");
      html = html.replace(regxImmediate,"");
      html = html.replace(regxValidator,"");
      html = html.replace(regxStyleClass,"class=");

    } 
    return html;
  }

  convDiv(html: string): string {
    html =  html.replace("p:outputPanel","div");
    html =  html.replace("styleClass","class");
    html =  html.replace("rendered","*ngIf");
    return html;
  }

}