import * as minimist from "minimist";

import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const comandosEnTerminal = minimist(argv);
  return comandosEnTerminal;
}
function processOptions(argv) {
  const indexProcessController = new PelisController();
  var respuesta;
  if (argv._[0] == "add") {
    var dataEnTerminal = new Peli();
    dataEnTerminal.id = argv.id;
    dataEnTerminal.title = argv.title;
    dataEnTerminal.tags = argv.tags;
    respuesta = indexProcessController.add(dataEnTerminal).then((resp) => {});
  }
  if (argv._[0] == "get") {
    var id = argv._[1];
    respuesta = indexProcessController.get({ id: id }).then((resp) => {
      return resp;
    });
  }
  if (argv._[0] == "search" && argv.title && !argv.tag) {
    var title = argv.title;
    respuesta = indexProcessController
      .get({ search: { title: title } })
      .then((resp) => {
        return resp;
      });
  }
  if (argv._[0] == "search" && !argv.title && argv.tag) {
    var tags = argv.tag;
    respuesta = indexProcessController
      .get({ search: { tag: tags } })
      .then((resp) => {
        return resp;
      });
  }
  if (argv._[0] == "search" && argv.title && argv.tag) {
    var tags = argv.tag;
    var title = argv.title;
    var parametros = { tag: tags, title: title };
    console.log(parametros);
    respuesta = indexProcessController
      .get({ search: parametros })
      .then((resp) => {
        return resp;
      });
  }
  if (argv._.length == 0) {
    respuesta = indexProcessController.get([]).then((resp) => {
      return resp;
    });
  }
  return respuesta;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  const dataIndex = processOptions(params);
  dataIndex.then((respFinal) => {
    return console.log(respFinal);
  });
}

main();
