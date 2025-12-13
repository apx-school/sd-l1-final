import minimist from "minimist";
import { PelisController, Options } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado.add) {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else if (resultado.search) {
    // Normalizamos tanto --tag como --tags a la propiedad 'tag'
    const tag =
      resultado.tag ||
      (Array.isArray(resultado.tags) ? resultado.tags[0] : resultado.tags); // Asegúrate de que sea un solo tag

    return {
      search: {
        title: resultado.title,
        tag: tag,
      },
    };
  } else if (resultado.get) {
    return {
      id: resultado.id,
    };
  } else {
    return {};
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  //console.log(params);

  const controller = new PelisController();

  if (params.id && params.title && params.tags) {
    controller
      .add({
        id: params.id,
        title: params.title,
        tags: params.tags,
      })
      .then((added) => {
        console.log(added);
      });
  } else if (params.search) {
    controller.get(params).then((pelis) => {
      console.log(pelis);
    });
  } else if (params.id) {
    controller.getOne(params).then((pelis) => {
      console.log(pelis);
    });
  } else {
    controller.get().then((pelis) => {
      console.log(pelis);
    });
  }
}

main();
