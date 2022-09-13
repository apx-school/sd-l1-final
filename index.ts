import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function ejecutador(params) {
  const controller = new PelisController();
  if (params._[0] == "search") {
    return await controller.get(params);
  }
  if (params._[0] == "get") {
    return await controller.get({ id: params._[1] });
  }
  if (params._[0] == "add") {
    return await controller.add(params);
  }
  return controller.model.getAll();
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutador(params).then((res) => {
    console.log(res);
  });
}

main();
