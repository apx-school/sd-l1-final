import minimist from "minimist";
import { PelisCollection } from "./models"; // Asegúrate de importar tu clase

type Search = {
  title?: string;
  tag?: string;
};

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisCollection = new PelisCollection();

  if (params._[0] === "get") {
    if (params._.length > 1) {
      const id = Number(params._[1]);
      const peli = await pelisCollection.getById(id);
      console.log(peli ? [peli] : []);
    } else {
      const pelis = await pelisCollection.getAll();
      console.log(pelis);
    }
  } else if (params._[0] === "search") {
    const searchOptions: Search = {};
    if (params.title) searchOptions.title = params.title;
    if (params.tag) searchOptions.tag = params.tag;

    const pelisFiltradas = await pelisCollection.search(searchOptions);
    console.log(pelisFiltradas);
  } else if (params._[0] === "add") {
    const newPeli = {
      id: params.id,
      title: params.title,
      tags: params.tags
        ? Array.isArray(params.tags)
          ? params.tags
          : [params.tags]
        : [],
    };

    const result = await pelisCollection.add(newPeli);
    console.log(
      result ? "Película agregada con éxito." : "Error al agregar la película.",
    );
  } else {
    console.log("Comando no reconocido. Usa 'get', 'search' o 'add'.");
  }
}

main();
