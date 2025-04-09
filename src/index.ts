import * as minimist from 'minimist';
import { PelisController } from './controllers';

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === 'add') {
    const newPeli = {
      id: args.id,
      title: args.title,
      tags: Array.isArray(args.tags) ? args.tags : [args.tags],
    };
    const added = await controller.add(newPeli);
    console.log(added ? 'Peli agregada con éxito' : 'No se pudo agregar la peli');
  } else if (args._[0] === 'get' && args._[1]) {
    const peli = await controller.get({ id: parseInt(args._[1]) });
    console.log(peli);
  } else if (args._[0] === 'search') {
    const searchOptions: { title?: string; tag?: string } = {};
    if (args.title) searchOptions.title = args.title;
    if (args.tag) searchOptions.tag = args.tag;
    const results = await controller.get({ search: searchOptions });
    console.log(results);
  } else {
    const allPelis = await controller.get();
    console.log(allPelis);
  }
}

main();
