import * as minimist from "minimist";
import {PelisController} from "./controllers";

//PARAMETROS
function parseaParams(argv) {
  const r = minimist(argv);
  if (r._[0] == "search" && r.title && r.tag) {
     return { search: { title: r.title, tag: r.tag } };
  } else if (r._[0] == "search" && r.title) {
     return { search: { title: r.title } };
  } else if (r._[0] == "search" && r.tag) {
     return { search: { tag: r.tag } };
  } else if (r._[0] == "get") {
     return { id: r._[1] };
  } else if (r._[0] == "add") {
      console.log(r.id, r.title, r.tag)
      return {
        id: r.id,
        title: r.title,
        tags: r.tag
     };
  } else {
     return {};
  }
}

//COMANDOS
function command(params){
  const controller = new PelisController();
  if (params.id && params.title && params.tags){
    console.log('Ok IF')
    return controller.add(params).then((r) => {
      console.log(r);
    });
  } else if (params.search || params.id) {
    console.log('Ok ELSE IF')
    return controller.get(params).then((r) => {
      console.table(r);
    });
  } else {
    console.log('Ok ELSE')
    return controller.get({}).then((r) => {
      console.table(r);
    });
  };
};

//MAIN
function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  command(params);
}

main();
