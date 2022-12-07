import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function exe(param) {
  const ejec = new PelisController();
  if (param._.includes("add")) {
    return await ejec.add(param);
  }
  if (param._.includes("search")) {
    return await ejec.get({ search: param });
  }
  if (param._.includes("get")) {
    return await ejec.get({ id: param._[1] });
  }
  return ejec.controllerPelis.getAll();
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = await exe(params);
  console.log(resultado);
}

main();