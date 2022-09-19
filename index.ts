import * as minimist from "minimist";
import { PelisController } from "./controllers";
import * as _ from "lodash";
import { parse } from "path";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptions(args) {
  const controller = new PelisController();
  if (args._[0] == 'add') {
    return await controller
    .add({
      id: args.id,
      title: args.title,
      tags: args.tags
    })
    .then(r => {return r})
  }
  if (args._[0] == 'get') {
    return controller.get({id: args._[1]})
  }
  if (args._[0] == 'search') {
    return controller.get({
      search: {title: args.title, tag: args.tag}
    })
  }
  if(args._ = "[]"){
    return controller.get();
  }
}

function main() {
  const argsParseados = parseaParams(process.argv.slice(2));
  console.log(argsParseados);
  return processOptions(argsParseados).then(res => {
    console.log(res)
    return res;
  });
}

main();
