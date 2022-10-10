import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function procesador(option) {
  let controller = new PelisController();

  if (option._[0] == "add") {
    return await controller.add({
      id: option.id,
      title: option.title,
      tags: option.tag,
    });
  }

  if (option._[0] === "get") {
    return controller.get({ id: option._[1] });
  }
  if (option._[0] === "search") {
    return controller.get({
      search: { title: option.title, tag: option.tag },
    });
  }
  return controller.get({});
}
function main() {
  const param = parseaParams(process.argv.slice(2));

  return procesador(param).then((i) => {
    console.log(i);
    return i;
  });
}

main();
