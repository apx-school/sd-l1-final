import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  
  if (params._.includes("get")) {
    const peli = await controller.get({ id: params._[1] });
    console.log(peli);
    return;
  } else if (params._.includes("add")) {
    const peli = await controller.add({
      id: params.id,
      title: params.title,
      tags: params.tags,
    });
    console.log("Película agregada:", peli);
    return;
  } else if (params._.includes("search")) {
    if (params.title && !params.tag) {
        const peli = await controller.get({ search: { title: params.title } });
        console.log(peli);
        return;
    } else if (params.tag && !params.title) {
        const peli = await controller.get({ search: { tag: params.tag } });
        console.log(peli);
        return;
    } else if (params.title && params.tag) {
        const peli = await controller.get({ search: { title: params.title, tag: params.tag } });
        console.log(peli);
        return;
    }
} else {
    controller.get({}).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error(error);
    });
}
}

main();
