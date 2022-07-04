import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  if (params._[0] == null) {
    return controller.get().then(x => console.log(x));
  }
  else if (params._[0] == "add") {
    return controller.add(
      {
        id: params.id,
        title: params.title,
        rating: params.rating,
        tags: params.tags,
        propuesto: params.propuesto
      }
    ).then(x => console.log(x));
  }
  else if (params._[0] == "search") {
    return controller.get(
      {
        search: {
          title: params.title,
          tags: params.tag,
        }
      }
    ).then(x => console.log(x));
  }
  else if (params._[0] == "get") {
    return controller.get({id: params._[1]}).then(x => console.log(x));
  }
}

main();
