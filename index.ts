import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli, SearchOptions } from "./models";

class Params {
  action: "add" | "get" | "search";
  options?: { id?: number; search?: SearchOptions };
  peli?: Peli;
}

function parseaParams(argv: string[]): Params {
  const resultado = minimist(argv);
  const action = resultado._;
  if (action.includes("add")) {
    return {
      action: "add",
      peli: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };
  } else if (action.includes("get")) {
    return {
      action: "get",
      options: {
        id: action[1],
      },
    };
  } else if (action.includes("search")) {
    return {
      action: "search",
      options: {
        search: {
          title: resultado.title,
          tag: resultado.tag,
        },
      },
    };
  } else {
    return { action: "get", options: {} };
  }
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  if (params.action === "add") {
    controller.add(params.peli).then((response) => {
      console.log(response);
    });
  } else {
    controller.get(params.options).then((response) => {
      console.log(response);
    });
  }
}

main();
