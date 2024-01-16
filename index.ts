import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  var opt = {
    action: resultado._[0],
    params: {},
  };
  var params = {};
  if (opt.action == "add") {
    params = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  }
  if (opt.action == "get") {
    params = {
      id: resultado._[1],
    };
  }
  if (opt.action == "search") {
    params = {
      search: {
        title: resultado.title,
        tag: resultado.tag,
      },
    };
  }
  if (!opt.action) {
    opt.action = "getAll";
  }

  opt.params = params;

  return opt;
}

function exe(arg) {
  var controller = new PelisController();

  if (arg.action == "add") {
    controller.add(arg.params);
  } else if (arg.action == "get") {
    controller.get(arg.params);
  } else if (arg.action == "search") {
    controller.get(arg.params);
  } else {
    controller.get({});
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  exe(params);
}

main();
