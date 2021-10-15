import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function parseandoTerminal(inpout, output) {
  if (inpout._[0] == "add") {
    return output.add(inpout).then((resultado) => resultado);
  } else if (inpout._[0] == "get" && typeof inpout._[1] == "number") {
    return output.get({ id: inpout._[1] }).then((resultado) => resultado);
  } else if (inpout._[0] == "search" && inpout.title && inpout.tag) {
    return output
      .get({ search: { title: inpout.title, tag: inpout.tag } })
      .then((resultado) => resultado);
  } else if (inpout._[0] == "search" && inpout.title) {
    return output
      .get({ search: { title: inpout.title } })
      .then((resultado) => resultado);
  } else if (inpout._[0] == "search" && inpout.tag) {
    return output
      .get({ search: { tag: inpout.tag } })
      .then((resultado) => resultado);
  } else if (inpout._.length == 0) {
    return output.get({}).then((resultado) => resultado);
  }
}

function main() {
  const controlador = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  parseandoTerminal(params, controlador).then((resultado) => {
    console.log(resultado);
  });
}

main();
