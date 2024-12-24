import { Peli } from "./models";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = require('minimist')(argv);
  return resultado;
}

function main() {
  const args = parseaParams(process.argv.slice(2));
  const controller = new PelisController();  
  if (args._[0] === "add") {
    const peli = {
      id: args.id,
      title: args.title,
      tags: args.tags,
    }    
    controller.add(peli).then((res) => {
      console.log(res);
    });
  }else if (args._[0] === "get" && args._[1]) {
    controller.getOne({ id: args._[1] }).then((res) => {
      console.log(res);
    });
  } else if (args._[0] === "search") {
    controller.get({ search: args }).then((res) => {
      console.log(res);
    });
  } else if (args._) {
    controller.get({}).then((res) => {
      console.log(res);
    });
  }
}
  
main();
