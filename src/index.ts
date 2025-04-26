import minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv: string[]) {
  return minimist(argv);
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  const command = params._[0];

  if (command === 'add') {
    const movie = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };

    const result = await controller.add(movie);
    console.log(result);
  } else if (command === 'get') {
    const id = params._[1];
    const result = await controller.getOne({ id });
    console.log(result);
  } else if (command === 'search') {
    const search: any = {};
    if (params.title) search.title = params.title;
    if (params.tag) search.tag = params.tag;

    const result = await controller.get({ search });
    console.log(result);
  } else {
    const result = await controller.get();
    console.log(result);
  }
}

main();
