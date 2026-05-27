import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const command = params._[0];

  if (command === "add") {
    const peli = {
      id: Number(params.id),
      title: params.title,
      tags: params.tags.split(","),
    };

    const result = await controller.add(peli);
    console.log(result);
    return;
  }

  if (command === "get") {
    const id = Number(params._[1]);
    const result = await controller.getOne({ id });
    console.log(result);
    return;
  }

  if (command === "search") {
    const result = await controller.get({
      search: {
        title: params.title,
        tag: params.tag,
      },
    });

    console.log(result);
    return;
  }

  const result = await controller.get();
  console.log(result);
}

main();