import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);

  const misPelis = new PelisController;
  if (params._ == "add"){
    const nuevaPeli = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    misPelis.add(nuevaPeli).then((c) => console.log(c));
  }
  else if (params._.includes("get")){
    const opt = {
      id: params._[1]
    }
    misPelis.get(opt).then((p) => console.table(p))
  }
  else if (params._ == "search"){
    const opt = {
      search:{
        title: params.title,
        tag: params.tag
      }
    }
    misPelis.get(opt).then((p) => console.table(p))
  }
  else {
    const opt = {}
    misPelis.get(opt).then((p) => console.log(p));
  }
}

main();
