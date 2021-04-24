import test from 'ava';
import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == 'get') {
    return {
      get: resultado._[1],
    };
  } else if (resultado._[0] == 'search') {
    return {
      search: { title: resultado.title, tag: resultado.tag },
    };
  } else if (resultado._[0] == 'add') {
    return {
      add: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };
  } else {
    return { result: 'empty' };
  }
}

function main() {
  const controller = new PelisController();
  controller.promise.then(() => {
    const params = parseaParams(process.argv.slice(2));

    if (params.add) {
      controller.add(params.add).then((r) => {
        console.log('Was Your Movie Added ? => ', r);
      });
    } else if (params.get) {
      controller.get(params).then((r) => {
        console.log(r);
      });
    } else if (params.search) {
      controller.get(params).then((r) => {
        console.log(r);
      });
    } else if (params.result) {
      controller.get(params).then((listOfMovies) => {
        console.log(listOfMovies);
      });
    }
  });
}
main();
