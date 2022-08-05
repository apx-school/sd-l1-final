import * as _ from "lodash";
import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
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
        tags: args.tags,
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
  if (_.isEmpty(args._[0])) {
    return controller.get({ empty: "empty" });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  return processOptions(params).then((res) => {
    console.log(res);
    return res;
  });
}

main();
