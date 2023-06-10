import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptions(params) {
  const controller = new PelisController();


  if (params._[0] == "add") {
    return await controller
    .add({
      id: params.id,
      title:params.title,
      tags: params.tags,
    })
    .then((res) => {
      return res;
    });
  }


if (params._[0] == "get") {
  return await controller.get({ id: params._[1] });
}

if (params._[0] == "search") {
  return controller.get({
    search: {title: params.title, tag: params.tags},
  });
}

if (_.isEmpty(params._[0])) {
  return controller.get({});
} 

}
function main() {
  const params = parseaParams(process.argv.slice(2));

  return processOptions(params).then((res) => {
    return res;
  });
  console.log(params);
}

main();
