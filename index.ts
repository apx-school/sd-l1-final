import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2)); // parsea params de la terminal
  const newController = new PelisController(); // inicializa controlador
  // TODO: pasar params al controller
}

main();
