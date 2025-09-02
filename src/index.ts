import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const params = minimist(rest);

  const controller = new PelisController();

  switch (cmd) {
    case "add": {
      const tags = Array.isArray(params.tags)
        ? params.tags
        : params.tags
        ? [params.tags]
        : [];
      const peli: Peli = {
        id: params.id,
        title: params.title,
        tags,
      };
      const ok = await controller.add(peli);
      console.log(ok ? "Pelicula agregada ✅" : "Error al agregar ❌");
      break;
    }
    case "get": {
      const id = Number(rest[0]);
      const peli = await controller.getOne({ id });
      console.log(peli || "Pelicula no encontrada ❌");
      break;
    }
    case "search": {
      const opts: any = {};
      if (params.title) opts.title = params.title;
      if (params.tag) opts.tag = params.tag;
      const res = await controller.get({ search: opts });
      console.log(res);
      break;
    }
    default:
      // si no hay cmd o no es válido, listamos todo
      console.log(await controller.get());
  }
}

main();
