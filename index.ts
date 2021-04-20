import { PelisController, PelisControllerOptions } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv): PelisControllerOptions {
  const resultado = minimist(argv);

  return {
    action: resultado.action,
    params: resultado.params,
  };
}

function main() {
  const controller = new PelisController();
  controller.promesa.then(() => {
    const params = parseaParams(process.argv.slice(2));
    const result = controller.procesOptions(params);
    console.log(result);
  });
}

main();
