import minimist from "minimist";
//Este import de pelis collection lo traigo solo para probar desde el index los métodos
import { PelisCollection, Peli } from "./models";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  if (!params._[0]) {
    const listadoPeliculas = await controller.get();
    console.table(listadoPeliculas);
  } else {
    if (params._[0] === "add") {
      if (!params.id || !params.title || !params.tags) {
        console.log("Faltan valores obligatorios para la película");
      } else {
        const nuevaPeli = {
          id: params.id,
          title: params.title,
          tags: params.tags,
        };
        const agregado = await controller.add(nuevaPeli);
        if (agregado) {
          console.log(`Se añadió la película ${nuevaPeli.title} al listado`);
        } else {
          console.log(
            `No se pudo agregar la película. Posible razón, ya existe una película con el id ${nuevaPeli.id}`
          );
        }
      }
    } else if (params._[0] === "get") {
      if (!params._[1]) {
        console.log("Falta ingresar el id de búsqueda");
      } else {
        const obtenido = await controller.getOne({ id: Number(params._[1]) }); //Paso a number el valor porque los parámetros entran como string
        if (obtenido) {
          console.table([obtenido]); //Lo envuelvo en un array sólo para que se vea mejor en la tabla
        } else {
          console.log(`No se pudo obtener la película con id ${params._[1]}`);
        }
      }
    } else if (params._[0] === "search") {
      const busca: { search: { title?: string; tag?: string } } = {
        search: {},
      };

      if (params.title) {
        busca.search.title = params.title; // Agregar título si existe
      }
      if (params.tag) {
        busca.search.tag = params.tag; // Agregar tag si existe
      }

      const resultado = await controller.get(busca);
      //La lógica de que busque por title solo, por tag solo o por ambas ya está en el controller.

      if (resultado.length > 0) {
        console.table(resultado);
      } else {
        console.log(
          "No se encontraron películas con los criterios de búsqueda."
        );
      }
    }
  }
}

main();
