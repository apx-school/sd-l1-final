import * as minimist from "minimist";
import {PelisController} from "./controllers";

//PARAMETROS
function parseaParams(argv) {
  const r = minimist(argv);
  if (r._[0] == "search" && r.title && r.tag) {
     return { search: { title: r.title.toUpperCase(), tag: r.tag } };
  } else if (r._[0] == "search" && r.title) {
     return { search: { title: r.title.toUpperCase() } };
  } else if (r._[0] == "search" && r.tag) {
     return { search: { tag: r.tag } };
  } else if (r._[0] == "get") {
     return { id: r._[1] };
  } else if (r._[0] == "add") {
      return {
        id: r.id,
        title: r.title.toUpperCase(),
        tags: r.tags
     };
  } else {
     return {};
  }
}

//COMANDOS
function command(params){
  const controller = new PelisController();
  if (params.id && params.title && params.tags){
    return controller.add(params).then((r) => {
      console.table(r);
    });
  } else if (params.search || params.id) {
    return controller.get(params).then((r) => {
      console.table(r);
    });
  } else {
    return controller.get({}).then((r) => {
      console.table(r);
    });
  };
};

//MAIN
function main() {
  const params = parseaParams(process.argv.slice(2));
  command(params);
}

main();
