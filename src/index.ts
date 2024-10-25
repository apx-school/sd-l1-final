import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: string[]): any {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();

  console.log(params); // Para verificar qué parámetros se están pasando

  // Verifica si se está intentando agregar una película
  if (params.add) {
    const nuevaPeli = {
      id: params.id,
      title: params.title,
      tags: params.tags || [], // Ya es un array si se pasan múltiples veces
    };

    try {
      const peliAgregada = await pelisController.add(nuevaPeli);
      console.log("Película agregada:", peliAgregada);
    } catch (error) {
      console.error("Error al agregar la película:", error.message);
    }
  }
  // Verifica si se está buscando una película por ID
  else if (params.id) {
    const id = Number(params.id); // Convierte el argumento a número
    const peli = await pelisController.get({ id });
    console.log("Película encontrada:", peli);
  }
  // Verifica si se está buscando una película por título
  else if (params.search && params.title) {
    const peli = await pelisController.get({
      search: { title: params.title },
    });
    console.log("Películas encontradas:", peli);
  }
  // Verifica si se está buscando una película por tag
  else if (params.search && params.tag) {
    const peli = await pelisController.get({
      search: { tag: params.tag },
    });
    console.log("Películas encontradas por tag:", peli);
  }
  // Si no se proporcionaron parámetros válidos
  else {
    console.log("No se proporcionaron parámetros válidos.");
  }
}

main();
