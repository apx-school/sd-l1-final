import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const controller = new PelisController();

  controller.get(params).then(async () => {
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
