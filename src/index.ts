import minimist from "minimist";
import { PelisController } from "./controllers";

function parsearArgumentos(argv: any) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const controller = new PelisController();
  const args = parsearArgumentos(process.argv.slice(2));

  // 1- Add, para agregar una película nueva
  if (args._[0] === "add") {
    // Solución para el error que me marcó Lisa si la tag es undefined: validamos que no sea undefined antes de armar el array
    let tagsAsignados: string[] = [];
    if (args.tags) {
      tagsAsignados = Array.isArray(args.tags) ? args.tags : [args.tags];
    }

    return controller
      .add({
        id: args.id,
        title: args.title,
        tags: tagsAsignados,
      })
      .then((resultado) => {
        console.log("¿Peli agregada con éxito?:", resultado);
        return resultado;
      });
  }

  // 2- Comando "get" por ID
  if (args._[0] === "get" && args._[1]) {
    const idNum = parseInt(args._[1]);
    return controller.get({ id: idNum }).then((peli) => {
      console.log(peli);
      return peli;
    });
  }

  // 3- Búsqueda con filtros
  if (args.title || args.tag) {
    return controller
      .get({
        search: {
          title: args.title,
          tag: args.tag,
        },
      })
      .then((pelisFiltradas) => {
        console.log(pelisFiltradas);
        return pelisFiltradas;
      });
  }

  // 4- En caso de no usar comandos, que devuelva array completo
  return controller.get().then((todasLasPelis) => {
    console.log(todasLasPelis);
    return todasLasPelis;
  });
}

main();
