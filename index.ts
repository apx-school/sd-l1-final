import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();
  if (params._[0] === 'add') {
    const { id, title, tags } = params;
    pelisController.add({ id, title, tags });
    //.then(result => console.log(result));
    //.catch(err => console.error('Error al agregar pelicula:', err));
  }

  if (params._[0] === 'get' || params._[0] === 'search') {
    const { tag, title } = params;
    pelisController.get({ id: params._[1], search: { tag, title } });
    //.then(result => console.log(result));
  }
}

main();
