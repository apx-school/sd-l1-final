import * as minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    return {
      add: { id: resultado.id, title: resultado.title, tags: resultado.tags },
    };
  } else if (resultado._[0] == "search" && resultado.tag && resultado.title) {
    return { search: { tag: resultado.tag, title: resultado.title } };
  } else if (resultado._[0] == "get") return { id: resultado._[1] };
  else if (resultado._[0] == "search" && resultado.title)
    return { search: { title: resultado.title } };
  else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else return resultado;
}
function selectorADDoGet(objeto) {
  const controller = new PelisController();

  if (objeto.add) {
    return controller.add(objeto.add).then((res) => {
      console.log(res);
      return res;
    });
  } else
    controller.get(objeto).then((p) => {
      console.log(p);
      return p;
    });
}

function main() {
  const objeto = parseaParams(process.argv.slice(2));
  const selector = selectorADDoGet(objeto);
}

main();