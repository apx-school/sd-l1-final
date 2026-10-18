
import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: string[]) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const comando = params._[0];

  if (comando === "add") {
    const id = Number(params.id);
    const title = params.title;
    const tags = String(params.tags || "")
      .split(",")
      .map((tag) => tag.trim());

    if (!Number.isInteger(id) || !title || !params.tags) {
      console.log("Faltan datos: --id, --title y --tags");
      return;
    }

    const agregado = await controller.add({
      id,
      title,
      tags,
    });

    console.log(agregado ? "Película agregada" : "No se pudo agregar");
    return;
  }

  if (comando === "get") {
    const id = Number(params._[1]);

    if (!Number.isInteger(id)) {
      console.log("Debés indicar un ID válido");
      return;
    }

    const peli = await controller.getOne({ id });
    console.log(peli ?? "Película no encontrada");
    return;
  }

  if (comando === "search") {
    const pelis = await controller.get({
      search: {
        title: params.title,
        tag: params.tag,
      },
    });

    console.log(pelis);
    return;
  }

  if (!comando) {
    const pelis = await controller.get();
    console.log(pelis);
    return;
  }

  console.log("Comando desconocido");
}

main().catch(console.error);
