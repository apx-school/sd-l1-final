import minimist from "minimist";
import { PelisController} from "./controllers";

function parseaParams(argv) {
  const parametros = minimist(argv);

  if (parametros.search){
    console.log("paso por search")
    return {
      search: parametros.search
    };
  }
 }

function main() {

  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  controller.get(params).then((resultado) => {
    console.log(resultado);
  })
}

main();
