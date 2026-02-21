import minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);
  return {
    action: resultado._[0],
    params: resultado
  };
}

async function main() {
  const {action, params} = parseaParams(process.argv.slice(2));
  const controller = new PelisController;
  switch (action){
  case "add":
    const peli = {
      id: Number(params.id),
      title: params.title,
      tags: params.tags ? params.tags.split(",") : []
    };
     const added = await controller.add(peli);
     console.log("Película agregada, ", added);
     break;
  case "get":
     const got = await controller.get(params);
     console.log("Película encontrada: ", got);
     break;
    default:
      controller.get();
  }
}

main();
