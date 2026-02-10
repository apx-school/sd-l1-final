import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: string[]) {
  return minimist(argv);
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  const comando = params._[0];

  if (comando === "add") {
    const tags = process.argv
      .filter((a) => a.startsWith("--tags="))
      .map((a) => a.split("=")[1]);
    controller
      .add({
        id: Number(params.id),
        title: params.title || "",
        tags: tags.length > 0 ? tags : [],
      })
      .then(() => console.log("Peli agregada"))
      .catch((err) => console.error(err));
    return;
  }

  if (comando === "get") {
    const id = params._[1] !== undefined ? Number(params._[1]) : params.id;
    controller
      .get({ id })
      .then((pelis) => console.log(pelis))
      .catch((err) => console.error(err));
    return;
  }

  if (comando === "search") {
    controller
      .get({
        search: {
          title: params.title,
          tag: params.tag,
        },
      })
      .then((pelis) => console.log(pelis))
      .catch((err) => console.error(err));
    return;
  }

  // Sin comando: devolver todas las películas
  controller
    .get()
    .then((pelis) => console.log(pelis))
    .catch((err) => console.error(err));
}

main();
