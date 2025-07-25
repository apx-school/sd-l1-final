// Importamos la librería minimist para parsear argumentos desde la terminal
import minimist from "minimist";

// Importamos la clase PelisController desde el archivo controller.ts
import { PelisController } from "./controllers";

// Esta función recibe los argumentos crudos del sistema y los parsea usando minimist
function parseaParams(argv) {
  // minimist convierte los argumentos en un objeto más fácil de manejar
  const resultado = minimist(argv);
  return resultado; // Retorna el objeto parseado
}

// Función principal que maneja la lógica del programa
async function main() {
  // Se obtienen los parámetros desde la terminal, quitando los dos primeros que no importan
  const params = parseaParams(process.argv.slice(2));

  // Creamos una instancia del controlador para poder usar sus métodos
  const controller = new PelisController();

  // Si el usuario no pasa ningún comando, devuelve todas las pelis
  if (!params._[0]) {
    const res = await controller.get({});
    console.log(res);
  }

  // Si el comando es 'get', busca por id
  else if (params._[0] == "get") {
    const id = Number(params._[1]); // Convertimos el segundo argumento a número
    const res = await controller.get({ id });
    console.log(res); // Mostramos el resultado
  }

  // Si el comando es 'search', busca por título, tag o ambos
  else if (params._[0] == "search") {
    const search = {}; // Creamos un objeto vacío para ir agregando filtros

    // Si el usuario pasó un título, lo agregamos al objeto
    if (params.title) {
      search["title"] = params.title;
    }

    // Si el usuario pasó un tag, también lo agregamos
    if (params.tag) {
      search["tag"] = params.tag;
    }

    // Llamamos al método get del controller pasando el objeto de búsqueda
    const res = await controller.get({ search });
    console.log(res);
  }

  // Si el comando es 'add', agregamos una nueva peli
  else if (params._[0] == "add") {
    // Armamos un objeto con los datos necesarios para crear la peli
    const nuevaPeli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };

    // Llamamos al método add del controller para guardar la peli
    const res = await controller.add(nuevaPeli);
    console.log(res); // Mostramos el resultado (true o false)
  }
}

// Llamamos a la función principal para ejecutar todo
main();
