import minimist from "minimist";
import { PelisController } from "./controllers";

const args = minimist(process.argv.slice(2));
const controller = new PelisController();

const main = async () => {
  const params = args._[0]; 
  const id = args.id ? Number(args.id) : args._[1] ? Number(args._[1]) : undefined;
  const title = args.title;
  const tag = args.tag;
  const tags = args.tags ? (Array.isArray(args.tags) ? args.tags : [args.tags]) : [];

  if (params === "add") {
    // Agrega la peli
    if (!id || !title) {
      console.log("Necesita id y title para agregar una pelicula");
      return;
    }
    const resultado = await controller.add({ id, title, tags });
    console.log(resultado ? "Pelicula agregada" : "Ya existe una pelicula con ese id");

  } else if (params === "get") {
    // Busca por id
    if (!id) {
      console.log("Necesitas pasar un id para buscar");
      return;
    }
    const peli = await controller.getOne({ id });
    console.log(peli ? peli : "No se encontró la película");

  } else if (params === "search") {
    // Busca por título o tag
    const resultados = await controller.get({ search: { title, tag } });
    console.log(resultados.length ? resultados : "No se encontraron películas");

  } else {
    //Muestra todas las pelis
    const todasLasPelis = await controller.get();
    console.log(todasLasPelis);
  }
};

main();
