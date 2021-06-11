import * as minimist from "minimist";
import {PelisController} from "./controllers"
import {PelisCollection, Peli} from "./models"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {

 

  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();
  console.log ("los parametros llegan asi:", params)


   if ( params._ == 'search' ){
    console.log("El comando que busca es", params._);
    // delete params._;
    if ( params.title && params.tag ) {
      console.log ("Usted busca dentro de los títulos:", params.title,)
      console.log ("Usted busca además dentro de los tag:", params.tag)
      const peliculaEncontrada = pelisController.get(params).then((p)=>{
        console.table(p);
        return (p);
      });
      console.table(peliculaEncontrada);

    } else if ( params.tag ){
      console.log("Usted busca dentro de los TAG:", params.tag);
      const peliTagEncontrada = pelisController.get(params).then((p)=>{
        console.table(p);
        return p;
      })
      console.table(peliTagEncontrada);

    } else if (params.title) { 
      console.log ("Usted busca la película:", params.title);
      var peliEncontrada = pelisController.get(params).then((p)=>{
        console.table(p);
        return p;
      });
      console.table(peliEncontrada);
    }
  } else if ( params._ == "add") {
    console.log ("Se agregará la siguiente película:", params.title);
    delete params._
    pelisController.add(params);

  } else if (params._[0] == "get") {
    console.log("Se buscará la película con el siguiente ID:", params._[1]);
    const peliId = new PelisCollection
    peliId.getById(params._[1]).then((p)=>{
      console.table(p);
      return p;
    });

  } else {
    console.log("El listado de todas las peliculas es:")
    pelisController.get().then((p)=>{
      return p;
    })
   }
  

}

main();
