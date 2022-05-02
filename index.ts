import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  // muy rebuscado pero la cosa es que funcione

  const { _: optionInputTerminal, ...rest } = resultado;

  if (optionInputTerminal.includes("get")) {
    return { id: optionInputTerminal[1] };
  } else if (optionInputTerminal.includes("add")) {
    return rest;
  } else if (optionInputTerminal.includes("search")) {
    return { search: rest };
  } else {
    return "index.ts";
  }
}

const result = async () => {
  const pelisController = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  let result;
  if (params == "index.ts") {
    result = await pelisController.listFilms.getAll();
  } else if (params.id && params.title && !params.search) {
    result = await pelisController.add(params);
  } else if (params.id || params.search) {
    result = await pelisController.get(params);
  }
  console.log(result);
};

function main() {
  result();
}

main();
