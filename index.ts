import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado
}

function objetos(params) {

  if (params._[0] == "get") {
    const objt = { get: { id: params._[1] } };
    return objt;
  } else if (params._[0] == "add") {
    if (params.tags && params.title) {
      return { search: { title: params.title, tags: params.tags } };
    } else if (params.tag) {
      return { search: { tags: params.tags } };
    } else if (params.title) {
      return { search: { title: params.title } };
    } else return {};

  } else if (params._[0] == "search") {
    if (params.tags && params.title) {
      return { search: { title: params.title, tags: params.tags } };
    } else if (params.tag) {
      return { search: { tags: params.tags } };
    } else if (params.title) {
      return { search: { title: params.title } };
    }
  } else return {};

  if (params.search) {
    return this.get(params.search).then((r) => {
      const s = r.filter((p) => {
        return p.search.includes(params.search)
      });
      return s;
    });

  }
  if (params.get) {
    return this.get(params.get).then((r) => {
      const s = r.filter((p) => {
        return p.get.includes(params.get)
      });
      return s;
    });

  }

}




function main() {
  const params = parseaParams(process.argv.slice(2));
  const peli = new PelisController();
  const result = objetos(params).then((resultado) => {
    console.log(result);
    console.log(resultado);
  });



}

main();
