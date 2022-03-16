import * as minimist from "minimist";
import { Peli } from "./models";

class Query {
  action: "search" | "get" | "add";
  id: string;
  peliToAdd: Peli;
  searchQuery: { title: string; tags: string[] };
}

function parseaParams(argv) {
  const res = minimist(argv);

  //obtengo solo la primera pos del array
  //para determinar la accion
  const action = res._[0];

  switch (action) {
    case "get":
      return { action: "get", id: argv._[1] };
    case "search":
      return { action: "search", tags: res.tags, title: res.title };
    case "add":
      return { action: "add", title: res.title, id: res.id, tags: res.tags };
    default:
      return { action: "get" };
  }
}

((args) => {
  const params = parseaParams(args);
  console.log(params);
})(process.argv.slice(2));
