import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptions(params) {
  const controller = new PelisController();
  console.log(`processOptions params: ${params}`);

  // ts-node index.ts add --id=4321865 --title="peli de la terminal 4321865" --tags=rr --tags=ww && ava
  if (params._[0] == "add") {
    return await controller
      .add({
        id: params.id,
        title: params.title,
        tags: params.tags,
      })
      .then((res) => {
        return res;
      });
  }

  // Prueba: ts-node index.ts get --id=2
  if (params._[0] == "get") {
    return await controller.get({ id: params._[1] });
  }

  // Prueba: ts-node index.ts search --title="a"
  if (params._[0] == "search") {
    return controller.get({
      search: { title: params.title, tag: params.tags },
    });
  }

  // Prueba: ts-node index.ts
  if (_.isEmpty(params._[0])) {
    return controller.get({});
  }
}

function main() {
  console.log(`process: ${process}`);

  const params = parseaParams(process.argv.slice(2));
  console.log(`index params: ${params}`);

  return processOptions(params).then((res) => {
    console.table(`index respuesta: ${res}`);
    return res;
  });
}

main();
