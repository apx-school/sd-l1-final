import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log("Este es el input:");
  console.log(resultado);

  let objetoInput = {};

  if (resultado._[0] == "get") {
    objetoInput = { id: resultado._[1] };
  } else if (resultado._[0] == "search") {
    if (resultado.title) {
      objetoInput["title"] = resultado.title;
    }
    if (resultado.tag) {
      objetoInput["tags"] = resultado.tag;
    }
  } else if (resultado._[0] == "add") {
    objetoInput["id"] = resultado.id;
    objetoInput["title"] = resultado.title;
    objetoInput["tags"] = resultado.tag;
  }
  console.log("este es el objeto que se va a pasar al controller:");
  console.log(objetoInput);

  return objetoInput;
}

function main() {
  const controller = new PelisController();
  controller.promesa.then(() => {
    const params = parseaParams(process.argv.slice(2));
    controller.get(params).then((res) => {
      console.log(res);
    });
  });
}

main();
