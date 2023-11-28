import * as minimist from "minimist";
import { PelisController } from "./controllers";
function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  if(params._[0] == "add") {
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    const controller = new PelisController()
    controller.add(peli).then((res) => {
      console.log(res)
    })
  }
  
  console.log(params);
}

main();
