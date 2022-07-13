import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv): any {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  const result = await controller.get(params);

  console.log(result);
}

main();
