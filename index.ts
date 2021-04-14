import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
   const resultado = minimist(argv);
   return resultado;
}

function main() {
   const params = parseaParams(process.argv.slice(2));
   const controller = new PelisController();

   params._[0] == "add"
      ? delete params._ && controller.add(params)
      : params._[0] == "get" || "search"
      ? controller.get(params)
      : controller.get(params);

   console.log(params);
}

main();
