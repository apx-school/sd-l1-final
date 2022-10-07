import * as minimist from "minimist";
import { title } from "process";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}
async function parseaParamsTerminal(parseo: any) {
  const control = new PelisController();
  if (parseo._[0] == "add") {
    return await control.add({
      id: parseo.id,
      title: parseo.title,
      tags: parseo.tags,
    });
  }
  else if (parseo._[0] == "get") {
    return await control.get({ id: parseo._[1] });
  }
  else if (parseo._[0] == "search") {
    return await control.get({
      search: { title: parseo.title, tag: parseo.tag },
    });
  } else {
    return await control.get({});
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const resuelve = await parseaParamsTerminal(params);
  console.log(resuelve);
}

main();
