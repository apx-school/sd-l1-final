import minimist from "minimist";
import { PelisCollection, Peli } from "./models";
import { PelisController, Options } from "./controllers";

function parseaParams(argv) {
  const args = minimist(process.argv.slice(2));
  if (args.get) {
    options.id = parseInt(args.get);
  }
  if (args.title) {
    options.search = { title: args.title };
  }
  if (args.tag) {
    options.search = { tag: args.tag };
  }
  if (args.add) {
    const { id, title, tags = [] } = args;
    const peliController = new PelisController(new PelisCollection());
    peliController.add({ id, title, tags });
  }
  if (args.title && args.tag) {
    options.search = {
      title: args.title,
      tag: args.tag,
    };
  } else {
  }
  return args;
}

const options: Options = {};

function main() {
  const params = parseaParams(process.argv);
  const pelisCollection = new PelisCollection();
  const pelisController = new PelisController(pelisCollection);
  pelisController.get(options).then((p) => console.log(p));
}

main();
