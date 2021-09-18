import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultadoMinimist = minimist(argv);
  if (resultadoMinimist.get) {
    return { id: resultadoMinimist.get };
  } else if (resultadoMinimist.search) {
    return { search: resultadoMinimist.search };
  } else if (resultadoMinimist.add) {
    return { add: resultadoMinimist.add };
  } else return {};
}

function main() {
  const argumentos = process.argv.slice(2);
  const argumentosParseados = parseaParams(argumentos);
  const peliController = new PelisController();
  const resultado = peliController.get(argumentosParseados);
  resultado.then((r) => {
    console.log(r);
  });
}

main();
