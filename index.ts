import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const res = minimist(argv);
  // console.log(res);
  //obtengo solo la primera pos del array
  //para determinar la accion
  const action = res._[0];
  switch (action) {
    case "get":
      return {
        action: "get",
        id: res._[1],
      };
    case "search":
      //si el parametro es tags plural o tag singular
      //deberia funcionar igual
      //tag singular es un array por eso esta entre []
      return {
        action: "get",
        search: {
          tags: res.tags || [res.tag], 
          title: res.title,
        },
      };
    case "add":
      return {
        action: "add",
        title: res.title,
        id: res.id,
        tags: res.tags,
      };
    default:
      return { action: "get" };
  }
}

((args) => {
  const params = parseaParams(args);
  const controler = new PelisController();

  switch (params.action) {
    case "add":
      const peli = new Peli(params.id, params.title, params.tags);
      controler.add(peli);
      break;
    case "get":
      controler
        .get(params)
        .then((res) => {
          console.log(res);
        });
    default:
      break;
  }
})(process.argv.slice(2));
