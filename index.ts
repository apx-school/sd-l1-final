import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const controller = new PelisController();

  controller.promise.then(() => {
    const params = parseaParams(process.argv.slice(2));
    const printResult = controller.get(params);
    console.log(printResult);
  });

  /*   const params = parseaParams(process.argv.slice(2));
  delete params._;
  console.log(params); */
}

main();
