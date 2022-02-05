import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv): any {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    var peli = new Peli();
    peli.id = resultado.id;
    peli.title = resultado.title;
    peli.tags = resultado.tags;
    return peli;
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search") {
    if (resultado.title && resultado.tag) {
      const atributosSearch = { title: resultado.title, tag: resultado.tag };
      return { search: atributosSearch };
    } else if (resultado.title) {
      const atributosSearch = { title: resultado.title };
      return { search: atributosSearch };
    } else if (resultado.tag) {
      const atributosSearch = { tag: resultado.tag };
      return { search: atributosSearch };
    }
  } else {
    return {};
  }
}

function main() {
  const argumentos = parseaParams(process.argv.slice(2));

  const controladorPelis = new PelisController();

  if (argumentos instanceof Peli) {
    const promesa = controladorPelis.add(argumentos);
    promesa.then((respuesta) => {
      console.log(respuesta);
    });
  } else {
    const promesa = controladorPelis.get(argumentos);
    promesa.then((respuesta) => {
      console.log(respuesta);
    });
  }
}

main();
