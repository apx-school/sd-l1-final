import minimist from "minimist";
import { PelisController, Options } from "./controllers";

function parseaParams(argv): Options {
  const resultado = minimist(argv);
  if (resultado._[0] === "search") {
    resultado.search = {};
    if (resultado.title) {
      resultado.search.title = resultado.title;
    }
    if (resultado.tag) {
      resultado.search.tag = resultado.tag;
    }
  } else if (resultado._[0] === "get" && resultado._[1]) {
    resultado.id = Number(resultado._[1]);
  }

  return resultado;
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  try {
    if (params._.length === 0) {
      const resultado = await controller.model.getAll();
      console.log(resultado);
    } else {
      const resultado = await controller.processOptions(params);
      if (params._[0] !== "add") {
        console.log(resultado);
      }
    }
  } catch (error) {
    console.log("Oops error:", error);
  }
}

main();
