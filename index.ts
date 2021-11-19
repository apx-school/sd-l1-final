import * as minimist from "minimist";
import { PelisController } from "./controllers";

async function comandosAEjecutar(params: any) {
  try {
    const control = new PelisController();
    if (params.title && params.id && params.tag) {
      const outPut = await control.add(params);
      return outPut;
    } else if (params.id) {
      const outPut = await control.get(params);
      return outPut;
    } else if (params.search) {
      const outPut = await control.get(params);
      return outPut;
    } else {
      const outPut = await control.get({});
      return outPut;
    }
  } catch (e) {
    console.log(e);
  }
}

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "add") {
    return { id: resultado.id, title: resultado.title, tags: resultado.tags };
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else {
    return {};
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const outPut = await comandosAEjecutar(params);
  console.log(outPut);
}

main();
