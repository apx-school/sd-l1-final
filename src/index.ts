import minimist from "minimist";
import { PelisController } from "./controllers"; // Asegúrate de importar PelisController
import { Peli } from "./models"; // Importa la clase Peli si la necesitas

const controller = new PelisController(); // Instancia de PelisController

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));

  if (params.add) {
    // Si se pasa el comando "add"
    const newPeli: Peli = {
      id: params.id,
      title: params.title,
      tags: params.tags.split(",") // Convierte los tags en un array
    };

    const success = await controller.add(newPeli);
    if (success) {
      console.log("Película agregada exitosamente:", newPeli);
    } else {
      console.log("Error: Ya existe una película con ese ID.");
    }
  } else if (params.get) {
    // Si se pasa el comando "get" con un ID
    const peli = await controller.getOne({ id: params.get });
    if (peli) {
      console.log("Película encontrada:", peli);
    } else {
      console.log("Película no encontrada.");
    }
  } else if (params.search) {
    // Si se pasa el comando "search"
    const results = await controller.get({ search: { title: params.search } });
    console.log("Resultados de búsqueda:", results);
  } else {
    // Si no se pasa ningún comando, muestra todas las películas
    const allPelis = await controller.get();
    console.log("Todas las películas:", allPelis);
  }
}

main();
