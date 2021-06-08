import * as minimist from "minimist";
import {PelisController} from "./controllers";
import {Peli} from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log(resultado);
  if (resultado._[0] == "get"){
    const objt = {get: {id: resultado._[1]}};
    return objt;
  }else if(resultado._[0] == "add"){
    const peli = new Peli();
    peli.id = resultado.id;
    peli.title = resultado.title;
    peli.tags = resultado.tags;

    const objt = {add: peli};
    return objt;    

  } else if (resultado._[0] == "search"){
    const objt = {
      search: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      }
    }
    return objt;
  }else return {};
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const parsedController = new PelisController();
  parsedController.get(params).then((r)=>{

    console.log(r);  
  })


}

main();
