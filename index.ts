import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams() {
  const resultado = minimist(process.argv.slice(2));
  return resultado;
}

async function comandosAEjecutar(params) {
  const pelisController = new PelisController();
  try {
    if (params._[0] == "get") {
      const outPut = await pelisController.get({ id: params._[1] });
      return outPut;
    } else if (params._ == "search") {
      const outPut = await pelisController.get({
        search: {
          title: params.title,
          tag: params.tag,
        },
      });
      return outPut;
    } else if (params._ == "add") {
      delete params._;
      return pelisController.add(params);
    } else {
      const outPut = await pelisController.get(params);
      return outPut;
    }
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  //const params = parseaParams(process.argv.slice(2));
  const params = parseaParams();
  const outPut = await comandosAEjecutar(params);
  console.log(outPut);
}

main();
