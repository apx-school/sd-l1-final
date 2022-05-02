import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const result = minimist(argv);
  //destructuring of the object by the terminal
  const { _: optionByTerminal, ...rest } = result;

  if (optionByTerminal.includes("get")) {
    return { id: optionByTerminal[1] };
  } else if (optionByTerminal.includes("add")) {
    return rest;
  } else if (optionByTerminal.includes("search")) {
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
