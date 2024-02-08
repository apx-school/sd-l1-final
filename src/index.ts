// import * as minimist from "minimist";
import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log("minimist", resultado);
  console.log(resultado._[0]);
  const params = {
    // add / get / search / no te viene nada minimist te devuelve un array vacio
    action: resultado._[0],
    options: {
      id: resultado.id || resultado._[1],
      title: resultado.title,
      tags: resultado.tags || resultado.tag,
    },
  };

  return params;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params.action === undefined) {
    console.log(await controller.get());
  } else {
    if (params.action === "add") {
      const seAgrego = await controller.add(params.options);
      seAgrego === true
        ? console.log("Se agrego correctamente.")
        : console.log("No se pudo agregar.");
    } else if (params.action === "search") {
      console.log(
        await controller.get({
          search: { title: params.options.title, tag: params.options.tags },
        })
      );
    } else {
      console.log(await controller.get({ id: params.options.id }));
    }
  }
}

main();
