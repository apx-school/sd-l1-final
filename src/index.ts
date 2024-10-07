import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  if (params._[0] === "add") {
    controller.model
      .add({
        id: params.id,
        title: params.title,
        tags: params.tags,
      })
      .then((res) => {
        console.log(res);
      });
  }
  if (params._[0] === "get") {
    controller.get({ id: parseInt(params._[1]) }).then((res) => {
      console.log(res);
    });
  }
  if (params._[0] === "search" && params.title) {
    controller
      .get({
        search: {
          title: params.title,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  if (params._[0] === "search" && params.tag) {
    controller
      .get({
        search: {
          tag: params.tag,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  if (params._[0] === "search" && params.title && params.tag) {
    controller
      .get({
        search: {
          title: params.title,
          tag: params.tag,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  if (process.argv.length === 2) {
    controller.model.getAll().then((res) => {
      console.log(res);
    });
  }
}

main();
