import { PelisController } from "./controllers"
import * as minimist from "minimist";

interface Response {
  command: string,
  value?: Peli
}

interface Peli {
  id?: number,
  title?: string,
  tags?: string[]
}

function parseaParams(argv: any): Response {
  const resultMin = minimist(argv);
  let respuesta: Response = {
    command: 'error'
  };
  // Comando ADD
  if (resultMin._[0] == "add") {
    if (resultMin.id && resultMin.title && resultMin.tags) {
      let movie = {
        id: resultMin.id,
        title: resultMin.title,
        tags: resultMin.tags,
      }
      respuesta = {
        command: "add",
        value: movie
      }
    }
  }
  // Comando GETONE
  else if (resultMin._[0] == "get") {
    const id = resultMin._[1]
    if(id){
      respuesta = {
        command: "get",
        value: {
          id: id
        }
      }
    }
  }
  // Comando SEARCH
  else if (resultMin._[0] == "search") {

    if (resultMin.title && resultMin.tags) {
      respuesta = {
        command: "search",
        value: {
          title: resultMin.title,
          tags: resultMin.tags
        }
      }
    } else if (resultMin.title) {
      respuesta = {
        command: "search",
        value: {
          title: resultMin.title
        }
      }
    } else if (resultMin.tags) {
      respuesta = {
        command: "search",
        value: {
          tags: resultMin.tags
        }
      }
    };
  }
  else if (!resultMin._.length) {
    respuesta = {
      command: "getall"
    }
  }
  return respuesta;

}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  const movController = new PelisController();
  movController.commands(params).then((result) => {
    console.table(result);
  });
}

main();