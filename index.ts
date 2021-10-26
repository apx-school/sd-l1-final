import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  
  return {
    id: resultado.id,
    search: JSON.parse(resultado.search)
    
    // {
    //   title: resultado.search.title,
    //   tag: resultado.search.tag,
    // }
  };
}

function main() {
  const controller = new PelisController();
  controller.coleccionPelis.getAll().then(() => {
    const params = parseaParams(process.argv.slice(2));
    console.log(params);
  })

}

main();
