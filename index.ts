import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function opcionesElegidas(params) {
  const pelis = new PelisController();
  if (params._.includes("get")) {
    return await pelis.get({ id: params._[1] });
  } else if (params._.includes("search")) {
    return await pelis.get({
      search: { title: params.title, tag: params.tag },
    });
  } else if (params._.includes("add")) {
    delete params._;
    return await pelis.add(params);
  } else {
    return pelis.pelis.getAll();
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const result = await opcionesElegidas(params);
  //console.log(params);
  console.log(result);
}

main();
