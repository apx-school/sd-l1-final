import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function ejecutaComandos(params) {
  //Agrega la película pero no la imprime en consola, me dice undifined...
  if (params._ == "add") {
    const objeto = {
      id: params.id,
      title: params.title,
      tag: params.tag,
    };
    const instancia = new PelisController();
    return instancia.add(objeto);
  }
  if (params._ == "search") {
    const objeto = {
      search: {
        title: params.title,
        tag: params.tag,
      },
    };
    const instancia = new PelisController();
    return instancia.get(objeto);
  }
  // if (params._[0] == "get") {
  //   console.log(params);
  //   const objeto = {
  //     id: params,
  //   };
  //   const instancia = new PelisController();
  //   return instancia.get(objeto.id);
  // }
}

function main() {
  const controlador = new PelisController();
  controlador.dataPromesa.then(() => {
    const params = parseaParams(process.argv.slice(2));
    const resultado = ejecutaComandos(params);
    console.log(resultado);
  });
}

main();
