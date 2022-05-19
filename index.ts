import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function optionsForControllers(params, controller) {
  var options;

  if (params._[0] == "add") {
    const newPeli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    options = controller.add(newPeli).then((objWithNewPeli) => objWithNewPeli);
  } else if (params._[0] == "get") {
    const theId = { id: params._[1] };
    options = controller.get(theId).then((objWithId) => objWithId);
  } else if (params._[0] == "search") {
    var anObj = {};

    if (params.title && params.tag) {
      anObj["title"] = params.title;
      anObj["tag"] = params.tag;
    } else if (params.title) {
      anObj["title"] = params.title;
    } else if (params.tag) {
      anObj["tag"] = params.tag;
    }

    options = controller.get({ search: anObj }).then((objSearch) => {
      return objSearch;
    });
    return options;
  }

  if (params._.length == 0) {
    options = controller.get({}).then((result) => result);
  }
  return options;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const controller = new PelisController();

  optionsForControllers(params, controller).then((result) => {
    console.log(result);
  });

  /* controller.get(params).then(async () => {
    if (params._[0] == "add") {
      delete params._;
      const addPeli = await controller.add(params);
      console.log(addPeli);
    } else {
      const printResult = await controller.get(params);
      console.log(printResult);
    }
  }); */
}

main();
