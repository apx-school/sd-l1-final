import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const paramsLimpio = limpiarObjeto(params);
  const controller = new PelisController();
  await controller.add(paramsLimpio)
}

main();

function limpiarObjeto(obj: any) {
  const objetoLimpio = {
    id: obj.id,
    title: obj.title,
    tags: obj.tags
  };
  return objetoLimpio;
}