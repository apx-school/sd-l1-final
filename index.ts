import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log(resultado);
  if (resultado._[0] == "get") {
    const objeto = { get: { id: resultado._[1] } };
    return objeto;
  } else if (resultado._[0] == "add") {
    const peli = new Peli();
    peli.id = resultado.id;
    peli.title = resultado.title;
    peli.tags = resultado.tag || resultado.tags;
    const objeto = { add: peli };
    return objeto;
  } else if (resultado._[0] == "search") {
    const objeto = {
      search: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tag || resultado.tags,
      },
    };
    return objeto;
  } else return {};
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliculasController = new PelisController();
  console.log(params);

  peliculasController.processOptions(params).then((restpuesta) => {
    console.log(restpuesta);
  });
}

main();
