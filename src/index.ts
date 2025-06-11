import minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);
  if(resultado.search) {
    return {search: resultado.search}
  }

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController();

  if (params._.includes("add")) {
    const peli = {
      id: Number(params.id),
      title: params.title,
      tag: Array.isArray(params.tag) ? params.tag : [params.tag],
    };
    const resultado = await peliController.add(peli);
    console.log(resultado ? "Plicula agregada con exito" : "Error al agregar la pelicula ")
  } else if (params._.includes("get")) {
    const id = Number(params._[1]);
    const resultado = await peliController.getOne({ id });
    console.log(resultado || "No se enconto la pelicula");
  } else if (params._.includes("search")) {
    const searchOptions = {
      title: params.title,
      tag: params.tag,
    };
    const resultado = await peliController.get({search: searchOptions});
    console.log(resultado.length ? resultado : "No se encontro Peliculas")
  } else {
    const resultado = await peliController.get();
    console.log(resultado);
  }
  console.log(params);
}

main();
