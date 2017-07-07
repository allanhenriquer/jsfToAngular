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

    arrayCloseTagFrom = ["<p:outputPanel", "" , "<h:outputLabel", "" ,  "<p:commandButton" , "<p:commandLink"];
    arrayCloseTagTo = ["</div>", "" ,"</label>", "" , "</button>" , "</a>"];

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
                case 5:
                  this.convButton(strTag);
                  console.log("strTag=" + strTag);
                   console.log("convButton=" + this.convButton(strTag));
                case 6:
                  this.convLink(strTag);
                  console.log("strTag=" + strTag);
                   console.log("convLink=" + this.convLink(strTag));   
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

  convButton(html : string) : string {

    var valorTagStyle = "";
    var valorTagStyleClass = "";
    var valorId = "";
    var valorOnClick = "";


    var regxStyleClassApas = /styleClass\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica styleClass="conteudo"
    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var pegaVal = /value\s*/ ;
    var regxValue = /value\s*=*\s*/; //identifica value=
    var regxStyleApas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"
    var regxStyle = /style\s*=*\s*/; //identifica style=
    var regxIdApas = /id\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Id="conteudo"
    var regxonclickApas = /onclick\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica onclick="conteudo"

    if(html !== null){

    if (html.match(regxValueApas) !== null) { //verifica se tem value

      var valorTagValue = this.pegaConteudo(html, regxValueApas, regxValue);
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

      }


      if (html.match(regxStyleClassApas) !== null) { //verifica se tem styleClass

        var arrStyleClass = regxStyleClassApas.exec(html);
        valorTagStyleClass = " " + arrStyleClass[0];
        valorTagStyleClass = valorTagStyleClass.replace("styleClass", "class");

      }

      var tagCorreta = "<button " + valorId+ valorTagStyleClass + " " + valorTagStyle + ">"+ valorTagValue +"</button>"

      //alert(tagCorreta);
	
	return tagCorreta;
      
    } else {

      html = "Error";
      console.log(html);
		return html;
    }

  }


  convLink(html : string) : string {

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
    var pegaVal = /value\s*/ ;
    var regxValue = /value\s*=*\s*/; //identifica value=
    var regxStyleApas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"
    var regxStyle = /style\s*=*\s*/; //identifica style=
    var regxRelApas = /rel\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Rel="conteudo"
    var regxRevApas = /rev\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Rev="conteudo"
    var regxValorTargetApas = /target\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica target="conteudo"
    var regxValorHrefLangApas = /hreflang\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica hreflang="conteudo"
    var regxIdApas = /id\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica Id="conteudo"
    var regxonclickApas = /onclick\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica onclick="conteudo"

    if(html !== null){

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

      var tagCorreta = "<a" + valorOnClick + valorId + valorTarget + valorRel + valorRev + valorHrefLang + valorTagStyleClass + " " + valorTagStyle + ">"+ valorTagValue +"</a>"

      //alert(tagCorreta);

      return tagCorreta;
    } else {

      html = "Error";
      console.log(html);
		return html;
    }

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