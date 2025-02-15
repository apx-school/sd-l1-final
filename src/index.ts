import minimist from "minimist";
import { PelisController } from "./controllers";
import { table } from "console";

function parseaParams(argv) {
  const resultadoMinimist = minimist(argv);
  const sliced = Object.fromEntries(Object.entries(resultadoMinimist).slice(1));

  if (resultadoMinimist._[0] == "add") {
    return { add: sliced };
  } else if (resultadoMinimist._[0] == "get") {
    const id = resultadoMinimist._[1];
    return { get: { id: id } };
  } else if (resultadoMinimist._[0] == "search") {
    return { search: sliced };
  } else {
    return false;
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController();
  const resultado = await peliController.processOptions(params);
  console.log(resultado);
}

main();
