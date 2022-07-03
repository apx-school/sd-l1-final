import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const instruccion = params._[0];
  const controller = new PelisController();
  if (instruccion == "add") {
    delete params._;
    controller.add(params);
  } else {
    if (instruccion == "get") {
      const resultado = controller.get({ id: params._[1] });
      resultado.then((i) => {
        console.log(i);
      });
    } else {
      if (instruccion == "search") {
        delete params._;
        const resultado = controller.get({ search: params });
        resultado.then((i) => {
          console.log(i);
        });
      } else {
        const resultado = controller.get(params);
        resultado.then((i) => {
          console.log(i);
        });
      }
    }
  }
}

main();
