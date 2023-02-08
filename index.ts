import * as minimist from "minimist";
import { PelisController } from "./controllers";

function soloParseaElArgv(argv) {
  return minimist(argv);
}

async function pasaLosParametros(param) {  
  const controller = new PelisController();
  if (param._.includes("add")) {
    return await controller.add( { id: param.id, title: param.title, tags: param.tags });
  }
  else if (param._.includes("search")) {
    return await controller.get({ search: param });
  }
  // else if (param._.includes("get")) {
  //   return await controller.get({ id: param._[1] });
  // }
  return controller;
}

async function main() {
  const params = soloParseaElArgv(process.argv.slice(2));
  const resultado = await pasaLosParametros(params);
  console.log(resultado);
}

main();


