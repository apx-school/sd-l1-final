import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}


function processOptions(argv) {
  const controller = new PelisController();
  if (argv._[0] == "get") {
    const id = argv._[1];
    return controller.get({ id: id }).then((movie) => {
      return movie;
    });

  }else if (argv._[0] == "search") {
    var params = {};
    if (argv.title) {
      params["title"] = argv.title;
    }
    if (argv.tag) {
      params["tag"] = argv.tag;
  
    }
    return controller.get({ search: params }).then((movie) => {
      return movie;
    });
    
  } if (argv._[0] == "add") {
    let newMovie = {
      id: argv.id,
      title: argv.title,
      tags: argv.tags,
    };
    return controller.add(newMovie).then((movie) => {
      return movie;
    });
  } else if (argv._.length == 0) {
    return controller.get({}).then((movie) => {
      return movie;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const result = processOptions(params);
  result.then((r)=>console.log(r));
}

main();