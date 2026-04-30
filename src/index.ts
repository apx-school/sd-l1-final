import minimist from "minimist";
import { PelisController } from "./controllers";

const pelisController = new PelisController();

async function main() {
  const params = minimist(process.argv.slice(2));

  if (params._[0] === "add") {
    const tags = params.tags
      ? Array.isArray(params.tags)
        ? params.tags
        : [params.tags]
      : [];
    //Lógica para agregar una peli
    // validar id antes y cortar la ejecución si no es válido
    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) {
      console.error("El id es obligatorio y debe ser un número válido");
      return;
    }
    // validar título mínimo
    if (!params.title) {
      console.error("El title es obligatorio");
      return;
    }
    const peli = { id, title: params.title, tags };

    const mensaje = await pelisController.add(peli);
    console.log(mensaje);
  } else if (params._[0] === "get") {
    //Obtener una peli por ID
    const id = Number(params._[1]);
    if (!Number.isInteger(id)) {
      console.error("El id para 'get' debe ser un número entero");
      return;
    }
      const peli = await pelisController.getOne({ id });
      console.log(peli);
  } else if (params._[0] === "search") {
    const results = await pelisController.get({
      search: { title: params.title, tag: params.tag },
    });
    console.log(results);
  } else {
    const pelis = await pelisController.get();
    console.log(pelis);
  }
}

main();
