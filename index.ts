//Index
import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

const input = (input) => {
  const controller = new PelisController();

  if (input._[0] == "add") {
    const peliAgregar = {
      id: input.id,
      title: input.title,
      tags: input.tags,
    };
    return controller.add(peliAgregar).then((res) => {
      return res;
    });
  }

  if (input._[0] == "get") {
    const id = input._[1];
    return controller.get({ id: id });
  }

  if (input._[0] == "search") {
    let inputIngresado = {};
    if (input.title && input.tag) {
      inputIngresado = {
        title: input.title,
        tag: input.tag,
      };
    } else if (input.title) {
      inputIngresado = {
        title: input.title,
      };
    } else if (input.tag) {
      inputIngresado = {
        tag: input.tag,
      };
    }
    return controller.get({ search: inputIngresado }).then((res) => {
      return res;
    });
  }

  if (input._.length == 0) {
    return controller.get([]).then((res) => {
      return res;
    });
  }
};

function main() {
  const params = parseaParams(process.argv.slice(2));
  const opciones = input(params);
  opciones.then((res) => {
    console.log(res);
  });
}

main();
