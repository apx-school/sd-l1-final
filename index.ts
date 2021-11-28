import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controladorDePelis = new PelisController();
  if(params._[0] == "add"){
    controladorDePelis.add({id: params.id, title: params.title, tags: params.tags});
  } else if (params._[0] == "get"){
    controladorDePelis.get({id: params._[1]}).then( data => console.log(data));
  } else if ( params._[0] == "search"){
    controladorDePelis.get({search:{title: params.title, tag: params.tag}}).then(data => console.log(data));
  } else {
    controladorDePelis.get().then(data => console.log(data));
  }
}

main();
