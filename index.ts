
import * as minimist from "minimist";
import { title } from "process";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(params) {
    const controller = new PelisController();
    if (params._[0] == "get") {
        return controller.get({id: params._[1]})
    } else if(params._[0] == "search"){
        if (params.title && params.tag) {
            return controller.get({search: {title: params.title, tags: params.tags} });
        } else if(params.title) {
            return controller.get({search: { title: params.title }});
        } else if(params.tags) {
            return controller.get({search: {tag: params.tags}});
        }
    }else if(params._[0] == "add") {
        return controller.add({ id: params.id, title: params.title, tags: params.tags });
    } else {
        return controller.pelis.getAll();
    }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  processOptions(params).then((resultado) => console.log(resultado));
}

main();