import minimist, { ParsedArgs } from 'minimist';
import { PelisController } from './controllers';
import { log } from 'console';
import { helpMenu } from './menu';
import { Peli } from './models';

enum Params {
   add = 'add',
   get = 'get',
   search = 'search',
   help = 'help',
   id = 'id',
   title = 'title',
   tags = 'tags',
}

function parseaParams(argv: string[]) {
   const resultado = minimist(argv);
   if (resultado._[0] === Params.help) {
      return { help: Params.help };
   } else if (resultado._[0] === Params.get) {
      return { get: resultado._[1] };
   } else if (resultado._[0] === Params.search) {
      return {
         search: {
            title: resultado.title,
            tag: resultado.tag,
         },
      };
   } else if (resultado._[0] === Params.add) {
      return {
         add: {
            id: resultado.id,
            title: resultado.title,
            tags: resultado.tags,
         },
      };
   } else return { none: '' };
}

async function main() {
   const controller = new PelisController();
   const params = parseaParams(process.argv.slice(2));
   if (params.add) {
      const tieneUndefined = Object.values(params.add).some(
         (value) => value === undefined,
      );
      if (tieneUndefined) {
         console.log({ Error: 'Debe ingresar id, title y al menos 1 tag' });
         return;
      }
      const peli = {
         id: params.add.id,
         title: params.add.title,
         tags: Array.isArray(params.add.tags)
            ? params.add.tags
            : [params.add.tags],
      };
      const result = await controller.add(peli);
      console.log(result);
   } else if (params.get) {
      const peli = await controller.get({ id: parseInt(params.get) });
      if (peli[0] === undefined) {
         console.log(`La pelicula con id:[${params.get}] no existe !`);
         return;
      }
      console.log(peli);
   } else if (params.search) {
      const pelis: Peli[] = await controller.get({ search: params.search });
      console.log(pelis);
   } else if (params.help) {
      console.log(helpMenu);
   } else {
      const result = await controller.get({});
      console.log(result);
   }
}

main();
