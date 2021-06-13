import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado
}

function objetos(params) {
  const peli = new PelisController();
  var resultado;
  if (params._[0] == "get") {
    const objt = { get: { id: params._[1] } };
    return objt;
  }
  else if (params._[0] == "search") {
    if (params.tags && params.title) {
      resultado = { search: { title: params.title, tags: params.tags } };
    } else if (params.tag) {
      resultado = { search: { tags: params.tags } };
    } else if (params.title) {
      resultado = { search: { title: params.title } };
    }
  } else return {};

  if (params.search) {
    var resultado;
    resultado = this.get(params.search).then((r) => {
      const s = r.filter((p) => {
        resultado = p.search.includes(params.search)
      });
      return s;
    });

  }
  if (params.get) {
    var resultado;
    resultado = this.get(params.get).then((r) => {
      const s = r.filter((p) => {
        resultado = p.get.includes(params.get)
      });
      return s;
    });

  }
  else if (params._[0] == "add") {
    var resultado;
    var objtG = {
      id: params.id,
      title: params.title,
      tags: params.tags
    };
    resultado = peli.add(objtG)
  } else {
    return peli.get({}).then((r) => {
      return r
    });
  }
}




function main() {
  const params = parseaParams(process.argv.slice(2));
  const result = objetos(params)
  console.log(result);


}

main();
