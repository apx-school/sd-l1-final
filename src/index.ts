import minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv: string[]) {
   const resultado = minimist(argv, {
      string: ['title', 'tag', 'tags'],
      alias: { id: 'i', title: 't', tag: 'g', tags: 'gs' },
   });

   return resultado;
}

async function main() {
   const params = parseaParams(process.argv.slice(2));
   const controller = new PelisController();

   if (params._[0] === 'add') {
      const peli = {
         id: params.id,
         title: params.title,
         tags: Array.isArray(params.tags) ? params.tags : [params.tags],
      };
      const result = await controller.add(peli);
      console.log(result);
   } else if (params._[0] === 'get') {
      const result = await controller.get({ id: parseInt(params._[1]) });
      console.log(result);
   } else if (params._[0] === 'search') {
      const searchOptions = {
         title: params.title,
         tag: params.tag,
      };
      const result = await controller.get({ search: searchOptions });
      console.log(result);
   } else {
      const result = await controller.get();
      console.log(result);
   }
}

main();
