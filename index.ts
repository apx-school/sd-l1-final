import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function opciones(params, pelisController) {
  if (params._.toString() === '') {
    // mostrar todo
    pelisController.get({}).then((res) => console.log(res));
  } else if (params._.toString().includes('get')) {
    const id = params._.slice()[1];
    pelisController.get({ id }).then((res) => console.log(res));
  }
  if (params._.toString() === 'search') {
    let options;
    if (params.title && params.tag) {
      options = {
        search: {
          title: params.title,
          tag: params.tag,
        },
      };
      pelisController.get(options).then((res) => console.log(res));
      // console.log(pelisController.get(options));
    } else if (params.title) {
      pelisController
        .get({ search: { title: params.title } })
        .then((res) => console.log(res));
    } else if (params.tag) {
      pelisController
        .get({ search: { tag: params.tag } })
        .then((res) => console.log(res));
    }
  }
  if (params._.toString() === 'add') {
    pelisController
      .add({ id: params.id, title: params.title, tags: params.tags })
      .then((res) => console.log(res));
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();
  opciones(params, pelisController);
}

main();
