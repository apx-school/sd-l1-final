import * as minimist from "minimist";
import { PelisController } from "./controllers";

function processOptionsArgv(argv) {
  const controller = new PelisController();
  const opcionStrg = argv._.toString();
  if (opcionStrg == "") {
    const esVacio = true;
    return { promesa: controller.get(esVacio) };
  }
  if (opcionStrg == "add") {
    const peli = { id: argv.id, title: argv.title, tags: argv.tags };
    const promesaAdd = controller.add(peli);
    const respuesta = promesaAdd.then((x) => {
      if (x) {
        return "La pelicula se guardo correctamente!";
      } else {
        return "El ID ya existe! Pruebe con otro ID";
      }
    });
    return { promesa: promesaAdd, texto: respuesta };
  }
  if (opcionStrg.startsWith("get")) {
    const id = argv._[1];
    return { promesa: controller.get({ id: id }) };
  }
  if (opcionStrg == "search") {
    let paramsSearch = {};
    if (argv.title && argv.tag) {
      paramsSearch = { title: argv.title, tags: argv.tag };
    } else if (argv.title) {
      paramsSearch = { title: argv.title };
    } else if (argv.tag) {
      paramsSearch = { tag: argv.tag };
    }
    return { promesa: controller.get({ search: paramsSearch }) };
  }
}

function parseaParams(parametros) {
  const argv = minimist(parametros);
  return argv;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const Resultado = processOptionsArgv(params);
  Resultado.promesa.then((resultado) => {
    if (Resultado.texto) {
      Resultado.texto.then((texto) => {
        console.log(texto);
      });
    } else {
      console.table(resultado);
    }
  });
}

main();
