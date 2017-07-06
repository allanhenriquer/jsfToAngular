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
  

       var res = 'button';

       var fs = 'ds';

        this.convMain(res+"");
    }

    convMain(strHtml : string) : void {
      debugger;
      var strTag : string = strHtml;
      var posicao : number = 0;
      var strHtml : string;
      
    
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
          this.convButton(strHtml);
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

    html = '<p:commandLink value="Ajax Submit"></p:commandLink>'

    var regxValueApas = /value\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica value="conteudo"
    var pegaVal = /value\s*/ ;
    var regxValue = /value\s*=*\s*/; //identifica value=
    var regxStyleApas = /style\s*=*\s*(["'])(?:(?=(\\?))\2.)*?\1/; //identifica style="conteudo"
    var regxStyle = /style\s*=*\s*/; //identifica style=
    


    if (html.match(regxValueApas) != null) { //verifica se tem value

      var valorTagValue = this.pegaConteudo(html, regxValueApas, regxValue);
    
    
      var valorTag = this.pegaConteudoTag(html, regxValueApas, pegaVal);

      var tagCorreta = "<button "+ valorTag + "='" + valorTagValue + "'></button>"

      console.log(tagCorreta);

      // if (html.match(regxStyleApas) != null) { //verifica se tem style

      //   var valorTagStyle = this.pegaConteudo(html, regxStyleApas, regxStyle);

      //   html = '<label style="' + valorTagStyle + '">' + valorTagValue + '</label>';
      //   console.log(html);

      // }  

    } else {

      html = "<label>" + "</label>";
      console.log(html);

    }
    return "";
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

  pegaConteudoTag(html: string, regxToFindAspas, regxToFind): string {

    var regxEspaco = /\s/g;

    var pegaValue = regxToFind.exec(html);
  

    return pegaValue;
    
}

}
