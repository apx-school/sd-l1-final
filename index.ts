import * as minimist from "minimist";
import {PelisController} from "./controllers";

function ejecutarComandos(params) {
  const controller = new PelisController();

  if (params.id && params.title && params.tags) {
    return controller.add(params).then((r) => { 
      console.log(r); 
    });
  } else if (params.search || params.id) {
    return controller.get(params).then((r) => {
      console.log(r);
    });
  } else {
    return controller.get({}).then((r) => {
      console.log(r);
    });
  }
}

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "get") {
    return {id: resultado._[1]};
  } else if (resultado._[0] == "search" && resultado.title) {
    return {search: {title: resultado.title}};
  } else if (resultado._[0] == "search" && resultado.tag) {
    return {search: {tag: resultado.tag}};
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return {search: {title: resultado.title, tag: resultado.tag}};
  } else if (resultado._[0] == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else { return {}; 
    }

}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComandos(params);
}

main();
