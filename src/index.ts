//import * as minimist from "minimist";
import minimist from "minimist";
import { PelisController, Options } from "./controllers";

function parseaParams(argv) {
  const mini = minimist(argv);
  return mini;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controlador = new PelisController();
  const action = params._[0];
  if (action == "add") {
    const peliNueva = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    controlador.add(peliNueva);
  }
  if (action == "search") {
    if (params.title && params.tag) {
      controlador
        .get({ search: { title: params.title, tag: params.tag } })
        .then((p) => {
          console.table(p);
          return p;
        });
    } else if (params.title) {
      controlador.get({ search: { title: params.title } }).then((p) => {
        console.table(p);
        return p;
      });
    } else if (params.tag) {
      controlador.get({ search: { tag: params.tag } }).then((p) => {
        console.table(p);
        return p;
      });
    }
  }
  if (action == "get") {
    const id = params._[1];
    controlador.get({ id: id }).then((p) => {
      console.table(p);
      return p;
    });
  }
  if (params._[0] == undefined) {
    controlador.get({}).then((p) => {
      console.table(p);
      return p;
    });
  }
}

main();
