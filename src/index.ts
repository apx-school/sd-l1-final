import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

const command = params._[0];

switch(command){
  case "search":
    const searchOptions = {
      title: params.title,
      tag: params.tag
    }
    controller.get({search:searchOptions}).then((y) =>
    console.log(y));
    break;
  
  case "add":
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tag
    }

    controller.add(peli).then((x) =>
    console.log(x));
    break;

    case "get":
      const options = {id: params._[1]};

      controller.get(options).then((p) =>
      console.log(p));
        break;

    case undefined:
      controller.get().then((f) => 
      console.log(f));
      break;
      }
}

main();
