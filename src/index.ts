import minimist from "minimist";
import { PelisController } from "./controllers";

type Params = {
  _: string[];
  id?: number;
  title?: string;
  tag?: string;
  tags?: string[] | string;
};

function parseaParams(argv: string[]): Params {
  return minimist(argv) as Params;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  try {
    if (params._[0] === "add") {
      const peli = {
        id: params.id,
        title: params.title,
        tags: Array.isArray(params.tags) ? params.tags : [params.tags],
      };

      const result = await controller.add(peli);
      console.log(
        result ? "Peli agregada con éxito" : "Error al agregar la peli"
      );
    } else if (params._[0] === "get") {
      const peli = await controller.get({ id: params.id });
      console.log(peli.length ? peli[0] : "Peli no encontrada");
    } else if (params._[0] === "search") {
      const options: { title?: string; tag?: string } = {};
      if (params.title) options.title = params.title;
      if (params.tag) options.tag = params.tag;

      const pelis = await controller.search(options);
      console.log(pelis.length ? pelis : "No se encontraron películas");
    } else {
      const pelis = await controller.get();
      console.log(pelis.length ? pelis : "No hay películas");
    }
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
}

main();
