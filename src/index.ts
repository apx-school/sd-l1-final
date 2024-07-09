import minimist from 'minimist';
import { PelisController, PelisControllerOptions } from "./controllers";

function parseaParams(argv):PelisControllerOptions{

  const resultado = minimist(argv.slice(2))

  const action = resultado._[0];
  const params = minimist(argv.slice(3))
  
  return{
    action: action,
    params: params,
  };

}





function main() {
  const argumentos = parseaParams(process.argv);
  const controlador = new PelisController;
  controlador.get(argumentos).then(result => {
    return result;

  })
}

main();
