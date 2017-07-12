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

    var strHtmlConvertido: string = "";
    var strTag: string;
    var posicao: number = 0;
    // var regx = /<\/?(?:\w{1,}):?[a-zA-Z0-9\s\="#\{\}\\/\\\'\]\@\:\(\)\;[\-\.]*\/?> /gm;
    var arrayTag: RegExpMatchArray;
    var arrayCloseTagFrom: string[];
    var arrayCloseTagTo: string[];

    arrayCloseTagFrom = ["<p:outputPanel", "<h:outputLabel", "<h:inputText", "<p:commandButton", "<p:commandLink"];
    arrayCloseTagTo = ["</div>", "</label>", "</input>", "</button>", "</a>"];

    while(strHtml.search('>') >= 0 ){
      var position : number = strHtml.search('>');
        if(strHtml.charAt(position+1) === "<"){
          ' ' +  strHtml.charAt(position+1);
            console.log(strHtml);
        }
      arrayTag = strHtml.split(strHtml.charAt(position+1));
    }
    // arrayTag = strHtml.match(regx);
    arrayTag.forEach(element => {
      strTag = element;
      
      var x: number = 1;
      arrayCloseTagFrom.forEach(element2 => {
        var next :string = "";
        if (element.indexOf(element2) != -1) {
          switch (x) {
            case 1:
              next = this.convDiv(strTag);
              break;
            case 2:
              next = this.convLabel(strTag);
              break;
            case 3:
              next = this.convInput(strTag);
              break;
            case 4:
              next = this.convButton(strTag);
              break;
            case 5:
              next = this.convLink(strTag);
              break;
            
          }
          strHtmlConvertido = strHtmlConvertido.concat(next);
          // console.log(strHtmlConvertido);
        }
        x++;
      });
    });
    strHtmlConvertido = strHtmlConvertido.trim();
    console.log("Novo HTML = " + strHtmlConvertido);
  }

  convButton(html: string): string {

    var valorTagStyle = "";
    var valorTagStyleClass = "";
    var valorId = "";
    var valorOnClick = "";
    var valorTagValue = "";

    var regxStyleClassApas = /styleClass\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica styleClass="conteudo"
    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var pegaVal = /value\s*/;
    var regxValue = /value\s*=*\s*/; //identifica value=
    var regxStyleApas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"
    var regxStyle = /style\s*=*\s*/; //identifica style=
    var regxIdApas = /id\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Id="conteudo"
    var regxonclickApas = /onclick\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica onclick="conteudo"

    if (html !== null) {

      if (html.match(regxValueApas) !== null) { //verifica se tem value

        valorTagValue = this.pegaConteudo(html, regxValueApas, regxValue);
      }

      if (html.match(regxIdApas) !== null) { //verifica se tem id
        var arrId = regxIdApas.exec(html);
        valorId = " " + arrId[0];
      }

      if (html.match(regxStyleApas) !== null) { //verifica se tem style
        var arrStyle = regxStyleApas.exec(html);
        valorTagStyle = " " + arrStyle[0];
      }

      if (html.match(regxonclickApas) !== null) { //verifica se tem onclick
        var arrOnClicklang = regxonclickApas.exec(html);
        valorOnClick = " " + arrOnClicklang[0];
        valorOnClick = valorOnClick.replace("onclick","(click)");
      }

      if (html.match(regxStyleClassApas) !== null) { //verifica se tem styleClass
        var arrStyleClass = regxStyleClassApas.exec(html);
        valorTagStyleClass = " " + arrStyleClass[0];
        valorTagStyleClass = valorTagStyleClass.replace("styleClass", "class");
      }
      
      var tagCorreta = "<button" + valorOnClick + valorId + valorTagStyleClass + " " + valorTagStyle + ">" + valorTagValue + "</button>"
      return tagCorreta;

    } else {
      html = "Error";
      return html;
    }
  }

  convLink(html: string): string {
    var valorTagStyle = "";
    var valorTagStyleClass = "";
    var valorHrefLang = "";
    var valorRel = "";
    var valorRev = "";
    var valorTarget = "";
    var valorId = "";
    var valorTagValue = "";
    var valorOnClick = "";

    var regxStyleClassApas = /styleClass\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica styleClass="conteudo"
    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var regxValue = /value\s*=*\s*/; //identifica value=
    var regxStyleApas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"
    var regxStyle = /style\s*=*\s*/; //identifica style=
    var regxRelApas = /rel\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Rel="conteudo"
    var regxRevApas = /rev\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Rev="conteudo"
    var regxValorTargetApas = /target\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica target="conteudo"
    var regxValorHrefLangApas = /hreflang\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica hreflang="conteudo"
    var regxIdApas = /id\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Id="conteudo"
    var regxonclickApas = /onclick\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica onclick="conteudo"

    if (html !== null) {

      if (html.match(regxValueApas) != null) { //verifica se tem value
        valorTagValue = this.pegaConteudo(html, regxValueApas, regxValue);
      }

      if (html.match(regxonclickApas) !== null) { //verifica se tem onclick
        var arrOnClicklang = regxonclickApas.exec(html);
        valorOnClick = " " + arrOnClicklang[0];
      }

      if (html.match(regxValorHrefLangApas) !== null) { //verifica se tem hreflang
        var arrStyleHreflang = regxValorHrefLangApas.exec(html);
        valorHrefLang = " " + arrStyleHreflang[0];
      }

      if (html.match(regxIdApas) !== null) { //verifica se tem id
        var arrId = regxIdApas.exec(html);
        valorId = " " + arrId[0];
      }

      if (html.match(regxRevApas) !== null) { //verifica se tem rev
        var arrStyleRev = regxRevApas.exec(html);
        valorRev = " " + arrStyleRev[0];
      }
      if (html.match(regxValorTargetApas) !== null) { //verifica se tem target
        var arrStyleTarget = regxValorTargetApas.exec(html);
        valorTarget = " " + arrStyleTarget[0];
      }
      if (html.match(regxStyleApas) !== null) { //verifica se tem style
        var arrStyle = regxStyleApas.exec(html);
        valorTagStyle = " " + arrStyle[0];
      }

      if (html.match(regxRelApas) !== null) { //verifica se tem rel
        var arrStyleRel = regxRelApas.exec(html);
        valorRel = " " + arrStyleRel[0];
      }

      if (html.match(regxStyleClassApas) !== null) { //verifica se tem styleClass

        var arrStyleClass = regxStyleClassApas.exec(html);
        valorTagStyleClass = " " + arrStyleClass[0];
        valorTagStyleClass = valorTagStyleClass.replace("styleClass", "class");

      }

      var tagCorreta = "<a" + valorOnClick + valorId + valorTarget + valorRel + valorRev + valorHrefLang + valorTagStyleClass + " " + valorTagStyle + ">" + valorTagValue + "</a>"
      return tagCorreta;
    } else {

      html = "Error";
      return html;
    }

  }

  convLabel(html: string): string {
    var valorTagValue = "";
    var valorTagStyle = "";
    var valorTagStyleClass = "";
    var valorTagId = "";

    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var regxValue = /value\s*=*\s*/; //identifica value=
    var regxStyleAspas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"
    var regxIdAspas = /id\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica id="conteudo"
    var regxStyleClassApas = /styleClass\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica styleClass="conteudo"

    if (html.match(regxValueApas) != null) { //verifica se tem value
      valorTagValue = this.pegaConteudo(html, regxValueApas, regxValue);

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

    var regxInputText = /h:inputText\s*/; //identifica p:inputText
    var regxRendered = /rendered\s*=*\s*/;
    var regxBinding = /\s*binding\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxConverter = /\s*converter\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxImmediate = /\s*immediate\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxValidator = /\s*validator\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/;
    var regxStyleClass = /styleClass\s*=*\s*/;

    html = html.replace(regxInputText, "input ");

    if (html.search(regxRendered) || html.search(regxBinding) || html.search(regxConverter) ||
      html.search(regxImmediate) || html.search(regxValidator) || regxStyleClass !== null) {

      html = html.replace(regxRendered, "*ngIf=");
      html = html.replace(regxBinding, "");
      html = html.replace(regxConverter, "");
      html = html.replace(regxImmediate, "");
      html = html.replace(regxValidator, "");
      html = html.replace(regxStyleClass, "class=");

    }
    return html;
  }

  convDiv(html: string): string {
    html = html.replace("p:outputPanel", "div");
    html = html.replace("styleClass", "class");
    html = html.replace("rendered", "*ngIf");
    return html;
  }

}