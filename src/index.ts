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
    const tags = params.tags
    ? (Array.isArray(params.tags) ? params.tags : [params.tags])
  : [];
    const peli = {
      id: Number(params.id),
      title: params.title,
      tags: tags
    };
     const added = await controller.add(peli);
     console.log("Película agregada, ", added);
     break;
  case "get":
     const got = await controller.get(params);
     console.log("Película encontrada: ", got);
     break;
     case "search":
      const resultado = await controller.get({
        search: {title: params.title, tag: params.tag}});
        console.log(resultado);
    default:
      console.log(await controller.get());
  }
}

main();
