import minimist from "minimist"; // Importa la librería minimist para parsear argumentos
import { PelisController } from "./controllers"; // Importa el controlador de películas

const controller = new PelisController(); // Crea una instancia de PelisController

// Función principal para manejar los comandos
async function main() {
  const args = minimist(process.argv.slice(2)); // Parsear los argumentos de la línea de comandos

  if (args._[0] === "add") {
    // Comando para agregar una película
    const peli = {
      id: args.id,
      title: args.title,
      tags: args.tags || [], // Asegúrate de que tags sea un array
    };
    const result = await controller.add(peli); // Llama al método add del controlador
    console.log(result ? "Película agregada correctamente." : "Error: ID duplicado o no se pudo agregar.");
  } else if (args._[0] === "get") {
    // Comando para obtener una película por ID
    const peli = await controller.getOne({ id: args._[1] });
    console.log(peli ? peli : "Película no encontrada.");
  } else if (args._[0] === "search") {
    // Comando para buscar películas
    const options = {
      title: args.title,
      tag: args.tag,
    };
    const pelis = await controller.get({ search: options });
    console.log(pelis.length > 0 ? pelis : "No se encontraron películas.");
  } else {
    // Si no se proporciona ningún comando, devuelve todas las películas
    const pelis = await controller.get();
    console.log(pelis);
  }
}

// Ejecuta la función principal
main().catch((err) => {
  console.error("Error:", err); // Manejo de errores
});
