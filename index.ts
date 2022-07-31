import * as minimist from "minimist";
import { PelisController } from "./controllers"
import { Peli } from "./models";

function parseaParams(argv){
  const resultado = minimist(argv);
  const controller = new PelisController()
  const get = resultado._[0] == "get";
  const add = resultado._[0] == "add";
  const search = resultado._[0] == "search";

  if (get) {  
    const buscarId = { id: resultado._[1] }
    return controller.get(buscarId);
  } else if (add) {  
    const peliNueva = new Peli()
    peliNueva.id = resultado.id
    peliNueva.tags = resultado.tags
    peliNueva.title = resultado.title
    return controller.add(peliNueva);
  } else if (search) { 
    const BuscarTitulo = { search: { title: resultado.title, tag: resultado.tag } }
    return controller.get(BuscarTitulo);
  }
  return controller.get("")
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  params.then(respuesta => {
    console.table(respuesta);
    
  })
}

main();