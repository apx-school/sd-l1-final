import minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv: string[]) {
  return minimist(argv);
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  const comando = params._[0];

  if (comando === 'add') {
    const peli = {
      id: Number(params.id),
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };

    const resultado = await controller.add(peli);
    console.log(resultado);
  } else if (comando === 'get') {
    const id = Number(params._[1]);
    const resultado = await controller.getOne({ id });
    console.log(resultado);
  } else if (comando === 'search') {
    const search: any = {};
    if (params.title) search.title = params.title;
    if (params.tag) search.tag = params.tag;

    const resultado = await controller.get({ search });
    console.log(resultado);
  } else {
    // Sin comando: devuelve todas las pelis
    const resultado = await controller.get();
    console.log(resultado);
  }
}

main();
