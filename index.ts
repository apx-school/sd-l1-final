import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const controller = new PelisController();
  controller.promesa.then(() => {
    const params = parseaParams(process.argv.slice(2));
    controller.get(params).then((res) => {
      console.log(res);
    });
  });
}

main();
