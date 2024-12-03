import minimist from "minimist";
import { PelisCollection, Peli} from "./models";
import { PelisController } from "./controllers";
const pelisController = new PelisController
function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  //console.log(params)
  if (params._[0] === "add") {
    const peliAgregada = new Peli(params.id, params.title, params.tags)
    pelisController.add(peliAgregada).then((resultado) => resultado)
  };

  if (params._[0] === ("get") /*&& typeof (params._[1]) === "number"*/) {
    const obj = { 
      id: typeof (params._[1]) === "number" ? params._[1] : undefined
      /////YO HABÍA HECHO ESTO: Mantenía el && arriba y hacia obj = {id : params._[1]}
  
    }
    pelisController.get(obj).then((resultado) => console.log(resultado))
  }

 

  if (params.title && params.tag) {
    const buscaPeli = { search: { title: params.title, tag: params.tag } }
    pelisController.get(buscaPeli).then((resultado) => console.log(resultado))
  }
  else if (params.title) {
    const buscaPeli = { search: { title: params.title } };
    pelisController.get(buscaPeli).then((resultado) => console.log(resultado))
  } 
  else if (params.tag) {
    const buscaPeli = { search: { tag: params.tag } };
    pelisController.get(buscaPeli).then((resultado) => console.log(resultado))
  }
  else {
    const nuevaPeliCollection = new PelisCollection; 
    return nuevaPeliCollection.getAll().then((resupuesta) => console.log ( resupuesta))
  }
   
     //.catch((error)=>console.error("Error papu", error));
     
   } // ESTO NO DEVUELVE NADAD.. VER

  //console.log(params);
  //}
;

main()  
