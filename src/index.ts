import minimist from "minimist";
import { Options, PelisController } from "./controllers";

function parseaParams(argv): Options {
  const resultado = minimist(argv);
  if (argv[0] == undefined) {
    return {
      action: "todos",
      id: resultado.id,
      search: {
        title: resultado.title,
        tag: resultado.tag,
      },
      peli: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };
  } else {
    return {
      action: argv[0],
      id: resultado.id,
      search: {
        title: resultado.title,
        tag: resultado.tag,
      },
      peli: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };
  }
}
function selector(options: Options) {
  const control = new PelisController();
  if (options.action === "search") {
    return control
      .get(options)
      .then((resultado) => {
        console.log("Resultado");
        console.log(resultado);
      })
      .catch((error) => {
        console.log(error, "error al realizar la busqueda");
      });
  } else if (options.action === "get") {
    return control.getOne(options).then((resultado) => {
      console.log("Resultado");
      console.log(resultado);
    });
  } else if (options.action === "add") {
    return control
      .add(options.peli)
      .then(() => {
        console.log("Se Guardo con exito");
      })
      .catch((error) => {
        return "Error al guardar" + " " + error.message;
      });
  } else if (options.action == "todos") {
    return control.get(options).then((resultado) => {
      console.log("Resultado");
      
      console.log(resultado);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  selector(params);
  console.log(params);
}

main();
