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
  console.log(params);
  if (params == null) {
    pelisCollection.getAll().then((p)=>{
      console.table(p);
      return p;
  })
  }
  // if (params._ == "search") {
  //   console.log("El parametro llega asi:", params )
  //   if ( params.title ) {
  //     const pelisEncontradas = pelisCollection.search( params.title )
  //     return pelisEncontradas;
  //   }
}
main();
