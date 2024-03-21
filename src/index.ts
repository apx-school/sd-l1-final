import { PelisController } from "./controllers";
import minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //console.log("minimist", resultado);
  //console.log(resultado._[0]);
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
    const argumentos = process.argv.slice(2);
    const argumentosParseados = parseaParams(argumentos);
    const ProController = new PelisController();
    if (argumentosParseados.action === undefined) {
      console.log(await ProController.get());
    } else {
      if (argumentosParseados.action === "add") {
        const seAgrego = await ProController.add(argumentosParseados.options);
        seAgrego === true
          ? console.log("Se agrego correctamente.")
          : console.log("No se pudo agregar.");
      } else if (argumentosParseados.action === "search") {
        console.log(
          await ProController.get({
            search: { title: argumentosParseados.options.title, tag: argumentosParseados.options.tags },
          })
        );
      } else {
        console.log(await ProController.get({ id: argumentosParseados.options.id }));
      }
    }
  }

main();
