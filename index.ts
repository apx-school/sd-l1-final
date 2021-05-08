import * as minimist from "minimist";
import { controllerOptions, PelisController } from "./controllers"
import { PelisCollection } from "./models"

function parseaParams(argv): controllerOptions {
  const resultado = minimist(argv);
  return { action: resultado.action,
    params: JSON.parse(resultado.params),
  };
}

function main() {
  const controller = new PelisController();
    controller.promesa.then(()=>{
    const params = parseaParams(process.argv.slice(2));
    const resultado = controller.processOptions(params);
    console.log(resultado);
  })
}
    
main();




