import minimist from "minimist";
import { PelisController, Options } from "./controllers";
import { Peli } from "./models";

// Función que parsea los argumentos de la terminal
function parseaParams(argv: string[]) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const comando = params._[0]; // Primer argumento posicional

  switch (comando) {
    case "add":
      const nuevaPeli: Peli = {
        id: Number(params.id),
        title: params.title,
        tags: Array.isArray(params.tags) ? params.tags : [params.tags],
      };
      const agregada = await controller.add(nuevaPeli);
      console.log(
        agregada
          ? "Peli agregada correctamente"
          : "No se pudo agregar la peli (ID duplicado)"
      );
      break;

    case "get":
      if (params._[1]) {
        const id = Number(params._[1]);
        const peliPorId = await controller.getOne({ id });
        console.log(peliPorId);
      } else {
        const todas = await controller.get();
        console.log(todas);
      }
      break;

    case "search":
      const opcionesSearch: Options = {
        search: {
          title: params.title,
          tag: params.tag,
        },
      };
      const resultados = await controller.get(opcionesSearch);
      console.log(resultados);
      break;

    default:
      const todas = await controller.get();
      console.log(todas);
      break;
  }
}

main();
