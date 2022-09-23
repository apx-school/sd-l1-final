import * as minimist from "minimist";
import { title } from "process";
import { PelisController } from "./controllers";


function parseaParams(argv:any) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptions(args:any){
  const controller = new PelisController();
  if (args._[0] == 'add') {
    return await controller.add({
      id: args.id,
      title: args.title,
      tags: args.tags
    });
  }
  else if (args._[0] == 'get') {
    return await controller.get({
      id: args._[1]
    })
  }
  else if (args._[0] == 'search') {
    return await controller.get({
      search: {
        title: args.title,
        tags: args.tag
      }
    })
  }
  else {
    return await controller.get()
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const respuesta = await processOptions(params);
  console.log(respuesta);
}

main();
