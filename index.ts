import * as minimist from "minimist";
import { rejects } from "node:assert";
import { argv } from "node:process";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  /* const resultadoMap = new Map(resultado);
  console.log(resultadoMap); */
  return resultado;
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  controller.add({ id: 4, title: "piratas del caribe", tags: ["aventura"] });
}

main();
