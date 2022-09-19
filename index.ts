import * as minimist from "minimist";
import { PelisController } from "./controllers";
import * as _ from "lodash";

function parseaParams(argv) {
  const argsParseados = minimist(argv);
  return argsParseados;
}

async function processOptions(args) {
  const controller = new PelisController();
  if (args._[0] == "add") {
    return await controller.add({
      id: args.id,
      title: args.title,
      tags: args.tags,
    });
  } else if (args._[0] == "get") {
    return await controller.get({
      id: args._[1],
    });
  } else if (args._[0] == "search") {
    return await controller.get({
      search: { title: args.title, tag: args.tag },
    });
  } else if (_.isEmpty(args._[0])) {
    return await controller.get({
      empty: "empty",
    });
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  // console.log(params);
  const respuestaFinal = await processOptions(params);
  console.log(respuestaFinal);
}

main();
