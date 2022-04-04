import * as _ from "lodash";
import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParametros(argv) {
  const resultado = minimist(argv);

  return resultado;
}
async function processOptions(args) {
  const controller = new PelisController();
  if (args._[0] == "add") {
    return await controller
      .add({
        id: args.id,
        title: args.title,
        tags: args.tag,
      })
      .then((res) => {
        return res;
      });
  }
  if (args._[0] == "get") {
    return controller.get({ id: args._[1] });
  }
  if (args._[0] == "search") {
    return controller.get({
      search: { title: args.title, tag: args.tag },
    });
  }
}

function main() {
  const parametros = parseaParametros(process.argv.slice(2));
  return processOptions(parametros).then((res) => {
    console.log(res);
    return res;
  });
}

main();
