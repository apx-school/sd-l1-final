import * as minimist from "minimist";
import { rejects } from "node:assert";
import { argv } from "node:process";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  chooseMethod(params);
  function chooseMethod(params) {
    // Funcion encargada de recibir los argumentos de la terminal y ejecutar los metodos correspondientes
    if (params._.length == 0) {
      controller.get({ all: "all" }).then((r) => {
        console.table(r);
      });
    }
    if (params._.length == 2) {
      const idObject = { id: 0 };
      idObject.id = params._[1];
      controller.get(idObject).then((r) => {
        console.table(r);
      });
    } else {
      if (params._.includes("get")) {
        controller.get(params).then((r) => {
          console.table(r);
        });
      }
      if (params._.includes("search")) {
        /* console.log(params); */
        controller.get(params).then((r) => {
          console.table(r);
        });
      }
      if (params._.includes("add")) {
        const peliAdd = { ...params };
        delete peliAdd._;
        controller.add(peliAdd).then((r) => {
          console.table(r);
        });
      }
    }
  }
}
main();
