import { PelisController } from "./controllers";
import minimist from "minimist";

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  const comando = params._[0];

  if (comando === "add") {
    const id = parseInt(params.id);
    const title = params.title;
    const tags = Array.isArray(params.tags) ? params.tags : [params.tags].filter(Boolean);

    if (isNaN(id)) {
      console.log("ID inválido");
      return;
    }
    if (!title) {
      console.log("Título es requerido");
      return;
    }

    const peli = { id, title, tags };
    const res = await controller.add(peli);
    console.log(res ? "Película agregada" : "Ya existe una película con ese ID");
  } 
  
  else if (comando === "get") {
    const id = parseInt(params._[1]);
    if (isNaN(id)) {
      console.log("ID inválido");
      return;
    }
    const res = await controller.get({ id });
    console.log(res);
  } 
  
  else if (comando === "search") {
    const searchParams: any = {};
    if (params.title) searchParams.title = params.title;
    if (params.tag) searchParams.tag = params.tag;

    if (Object.keys(searchParams).length === 0) {
      console.log("Se necesita al menos --title o --tag");
      return;
    }

    const res = await controller.get({ search: searchParams });
    console.log(res);
  } 
  
  else if (!comando) {
    const res = await controller.get();
    console.log(res);
  } 
  
  else {
    console.log("Comando no reconocido:", comando);
  }
}

main();
