import * as minimist from "minimist";
import * as omit from "lodash/omit";
import * as assign from "lodash/assign";
import * as isNumber from "lodash/isNumber";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv): any {
  const resultado = minimist(argv);
  const count = resultado["_"].length;
  return {
    type: resultado["_"][0],
    result:
      count === 0 //vacio
        ? {}
        : resultado["_"][0] === "add" //add
        ? omit(resultado, "_")
        : isNumber(resultado["_"][1]) //id
        ? { id: resultado["_"][1] }
        : { search: omit(resultado, "_") }, //search
  };
}

async function processParams(params) {
  const controller = new PelisController();
  switch (params.type) {
    case "add":
      const peli = assign(new Peli(), params.result);
      console.log(await controller.add(peli));
      break;
    default:
      console.log(await controller.get(params.result));
      break;
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  processParams(params);
}

main();
