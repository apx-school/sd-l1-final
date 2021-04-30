import test from 'ava';
import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == 'get') {
    return {
      get: { id: resultado._[1] },
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

function processOptions(params) {
  const controller = new PelisController();

  if (params.add) {
    return controller.add(params.add).then((r) => {
      return 'Was Your Movie Added ? => ' + r;
    });
  } else if (params.get) {
    return controller.get(params.get).then((r) => {
      return r;
    });
  } else if (params.search) {
    return controller.get(params).then((r) => {
      return r;
    });
  } else if (params.result) {
    return controller.get(params).then((listOfMovies) => {
      return listOfMovies;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const result = processOptions(params);
  result.then((r) => console.log(r));
}

main();
