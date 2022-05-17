import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const controller = new PelisController();

  controller.promise.then(async () => {
    const params = parseaParams(process.argv.slice(2));
    // CÓDIGO VIEJO
    /* const printResult = controller.get(params);
    console.log(await printResult);
  }); */

    if (params._[0] == "add") {
      delete params._;
      const addPeli = await controller.add(params);
      console.log(addPeli);
    } else {
      const printResult = await controller.get(params);
      console.log(printResult);
    }
  });
}

main();
