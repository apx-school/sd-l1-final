import * as minimist from "minimist";
import { PelisController } from "./controllers";
function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params._.length)
  const controller = new PelisController()

  if (params._[0] === 'add') {
    const movie = { ...params }
    const newMovie = { id: movie.id, title: movie.title, tags: movie.tags }
    controller.add(newMovie).then(res => console.log(res))

  }
  else if (params._[0] === 'get') {
    controller.get({ id: params._[1] }).then(res => console.log(res))

  }
  else if (params._[0] === 'search') {

    controller.get({
      search: {
        title: params.title,
        tag: params.tag
      }
    }).then(res => console.log(res))
  } else if (params._.length === 0) {
    controller.get().then(res => console.log(res))
  }

}

main();
