import * as minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function opera(controlador, options) {
  if (options._[0] == "get") {
    return controlador.get({ id: options._[1] });
  } else if (options._[0] == "search") {
    delete options._;
    return controlador.get({ search: options });
  } else if (options._[0] == "add") {
    delete options._;
    return controlador.add(options);
  } else return controlador.get(false);
}

function main() {
  const parametros = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  opera(controller, parametros).then((res) => console.log(res));
}

main();
