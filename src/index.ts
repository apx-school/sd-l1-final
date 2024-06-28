import minimist from 'minimist';
import { PelisController } from './controllers';

async function main() {
  const params = minimist(process.argv.slice(2), {
    string: ['title', 'tag', 'id'],
    alias: { t: 'title', g: 'tag' },
  });

  const pelisController = new PelisController();

  if (params._[0] === "add" && params.id && params.title && params.tags) {
    const newPeli = {
      id: params.id,
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };
    const result = await pelisController.add(newPeli);
    console.log(result);
  } else if (params._[0] === "get" && params._[1]) {
    const peliId = parseInt(params._[1]);
    const peli = await pelisController.get({ id: peliId });
    console.log(peli);
  } else if (params._[0] === "search") {
    const searchOptions = {
      title: params.title,
      tag: params.tag,
    };
    const pelis = await pelisController.get({ search: searchOptions });
    console.log(pelis);
  } else {
    const allPelis = await pelisController.get({});
    console.log(allPelis);
  }
}

main();
