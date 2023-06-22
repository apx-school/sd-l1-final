import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";


function parseaParams(argv): any {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    return {
      action: "add",
      params: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };
  } else if (resultado._[0] == "get") {
    return {
      action: "get",
      params: { id: resultado._[1] },
    };
  } else if (resultado._[0] == "search") {
    let searchOptions = {};
    if (resultado.title) {
      searchOptions["title"] = resultado.title;
    }
    if (resultado.tag) {
      searchOptions["tag"] = resultado.tag;
    }

    return {
      action: "search",
      params: { search: searchOptions },
    };
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const controller = new PelisController();

  if (params.action == "add") {
    if (params.params.id && params.params.title && params.params.tags) {
      const newPeli: Peli = {
        id: params.params.id,
        title: params.params.title,
        tags: params.params.tags,
      };

      controller.add(newPeli).then((result) => {
        console.log(result);
      });
    } else {
      console.log("Missing parameters for add action");
    }
  } else if (params.action == "get") {
    controller.get(params.params).then((result) => {
      console.log(result);
    });
  } else if (params.action == "search") {
    controller.get(params.params).then((result) => {
      console.log(result);
    });
  }
}

main();
