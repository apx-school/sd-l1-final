import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const imput = minimist(argv);
  if(imput._.includes("get")){
    imput.id = imput._[1];
  }
  return imput;
}

function main() {
  let resultado;
  const pelisController = new PelisController();
  const imput = parseaParams(process.argv.slice(2));
  resultado = pelisController.processOptions(imput).then((listo)=>{console.log(listo)});
}

main();
