import minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv: any) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();

  console.log(params);

  const action = params._[0];
  const { id, title, tags, tag } = params;

  switch (action) {
    case 'add':
      pelisController.add({ id, title, tags });
      break;
    case 'get':
      console.table(await pelisController.getOne({ id: +params._[1] }));
      break;
    case 'search':
      console.table(await pelisController.get({ search: { title, tag } }));
      break;
    default:
      console.table(await pelisController.get({}));
  }
}

main();
