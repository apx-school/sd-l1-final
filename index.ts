import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv): any {
  const params = minimist(argv);
  const options = params._[0];

  if (options == 'get') {
    return { id: params._[1] };
  } else if (options == 'search') {
    if (params.title && params.tag) {
      return { search: { title: params.title, tags: params.tag } };
    } else if (params.title) {
      return { search: { title: params.title } };
    } else if (params.tag) {
      return { search: { tags: params.tag } };
    }
  } else if (options == 'add') {
    return { add: { id: params.id, title: params.title, tags: params.title } };
  } else {
    return {};
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  controller.get(params).then((res) => {
    console.log(res);
  });
}

main();
