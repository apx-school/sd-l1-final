import minimist from "minimist";
import { PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado.search){
    return {
      search: resultado.search
    };
  } else {
    return {};
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
