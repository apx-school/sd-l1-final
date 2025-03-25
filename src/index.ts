import { PelisController } from "./controllers";
import  minimist from "minimist"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelicula = new PelisController();
  const argumento = params._[0];
  switch(argumento){
    case "add":
      const nuevaPeli = {
        id: params.id,
        title: params.title,
        tags: params.tags
      };    
     pelicula.add(nuevaPeli).then(p=> console.log(p,"se agrego la pelicula"));
    break;
    case "get":
      let identificando = params._[1];
      let numero = Number(identificando);
      let edi = {id : numero};
      pelicula.get(edi).then(p => console.log(p));
      break;
      case "search":
        const peliSearch = {
          search:{
          title : params.title || undefined,
          tag : params.tag || undefined
          }
        }
        pelicula.get(peliSearch).then(p => console.log(p));
       // console.log(params);
      break;
      default :
      pelicula.get().then(p => console.log(p));



  }
}
main();