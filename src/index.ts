import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controlador = new PelisController();
  try {
    if (params._[0] == "add") {
      const obj = {
        id: params.id,
        title: params.title,
        tags: params.tags,
      };
      await controlador.add(obj);
    } else if (params._[0] == "get") {
      const obj = {
        id: params._[1],
      };
      const resultado = await controlador.get(obj);
      console.log(resultado);
    } else if (params._[0] == "search") {
      const obj = {
        search: {
          title: params.title,
          tag: params.tag,
        },
      };
      const resultado = await controlador.get(obj);
      console.log(resultado);
    } else{
      const resultado = await controlador.get();
      console.log(resultado);
    }
  } catch (error) {
    console.log("error", error);
  }
}

main();