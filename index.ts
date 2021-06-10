import * as minimist from "minimist";
import {PelisController} from "./controllers"
import {PelisCollection, Peli} from "./models"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisCollection = new PelisCollection();
  console.log ("los parametros llegan asi:", params)
  
   if ( params._ == 'search' ){
    console.log("El comando que busca es", params._);
    if ( params.title && params.tag ) {
      console.log ("Usted busca dentro de los títulos de la película:", params.title,)
      console.log ("Usted busca además dentro de los tag:", params.tag)
      const peliculaEncontrada = pelisCollection.search(params).then((p)=>{
        console.table(p);
        return p;
      });
    } else if ( params.tag ){
      console.log("Usted busca dentro de los tag:", params.tag);
      const peliTagEncontrada = pelisCollection.search(params).then((p)=>{
        console.table(p);
        return p;
      });
      console.table(peliTagEncontrada);
    } else if (params.title) { 
      console.log ("Usted busca la película:", params.title);
      var peliEncontrada = pelisCollection.search(params).then((p)=>{
        console.table(p);
        return p;
      });
      console.table(peliEncontrada);
    }
  } else if ( params._ == "add") {
    console.log ("Se agregará la siguiente película:", params.title);
    delete params._
    pelisCollection.add(params);

  } else if (params._ == 'get') {
    console.log("Se buscará la película con el siguiente ID:", params._);
    pelisCollection.getById(params._);

  } else if ( params._ == null ) {
    pelisCollection.getAll().then((p)=>{
      console.table(p);
      return p;
    })
  }
}

main();
