import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  try {
    const params = parseaParams(process.argv.slice(2));
    const controller = new PelisController();
    const comando = params._[0];

    if (comando === "add") {
      const peli = {
        id: params.id,
        title: params.title,
        tags: params.tags instanceof Array ? params.tags : [params.tags],
      };
      const resultado = await controller.add(peli);
      console.log(resultado);
    } else if (comando === "get") {
      const resultado = await controller.get({ id: params._[1] }); // Usá params._[1] para el id
      console.log(resultado);
    } else if (comando === "search") {
      const searchOptions = {
        title: params.title, // Asignás el título si existe
        tag: params.tag,     // Asignás el tag si existe
      };
      const resultado = await controller.get({ search: searchOptions });
      console.log(resultado);
    } else {
      const resultado = await controller.get();
      console.log(resultado);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
