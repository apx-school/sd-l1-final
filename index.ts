import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == 'search' || resultado._[0] == 'get') {
    return {
      id: resultado._[1],
      search: { title: resultado.title, tags: resultado.tag },
    };
  }
  if (resultado._[0] == 'add') {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else {
    return {};
  }
}

function ejecutarComandos(params) {
  const controller = new PelisController();

  if (params.id && params.title && params.tags) {
    return controller.add(params).then((r) => {
      console.log(r);
    });
  } else if (params.search || params.id) {
    return controller.get(params).then((r) => {
      console.log(r);
    });
  } else {
    return controller.get({}).then((r) => {
      console.log(r);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComandos(params);
  //console.log(params);
}

main();
