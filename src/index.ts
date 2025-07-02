import minimist from "minimist";
import { PelisController } from "./controllers";
type Options = {
  command?: string;
  id?: number;
  title?: string;
  tag?: string;
  tags?: string[];
};

function parseaParams(argv): Options {
  const resultado = minimist(argv);
  const command = resultado._;
  let res: Options = {
    command: null,
    id: null,
    title: null,
    tag: null,
    tags: null,
  };

  if (command.length > 1) {
    // Es get
    res = {
      command: command[0],
      id: command[1],
    };
  } else if (resultado.tag) {
    res = {
      command: command,
      id: resultado.id,
      title: resultado.title,
      tag: resultado.tag,
    };
  } else if (resultado.tags) {
    res = {
      command: command,
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else if (resultado.title) {
    res = {
      command: command,
      id: null,
      title: resultado.title,
      tags: null,
    };
  }
  return res;
}

async function main() {
  const controller = new PelisController();
  await controller.init();
  const params = parseaParams(process.argv.slice(2));

  if (params.command == "add") {
    const res = controller.add({
      id: params.id,
      title: params.title,
      tags: params.tags,
    });
    return res;
  } else if (params.command == "get") {
    const res = controller.getOne({ id: params.id });
    return res;
  } else if (
    params.command == "search" &&
    params.title?.length > 0 &&
    params.tag
  ) {
    const res = controller.get({
      search: { title: params.title, tag: params.tag },
    });
    res.length > 0 ? res : console.error("Pelicula no encontrada.");
  } else if (params.command == "search" && params.title?.length > 0) {
    const res = controller.get({ search: { title: params.title } });
    console.log("Res :", res);
  } else if (params.command == "search" && params.tag) {
    const res = controller.get({ search: { tag: params.tag } });
    console.log("Res :", res);
  } else {
    const res = controller.get();
    console.log("Res :", res);
    return res;
  }
}
// Me quede aca : npx tsx ./src/index.ts search --title="a"

main();
