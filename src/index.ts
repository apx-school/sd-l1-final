import minimist from "minimist";
import { PelisController } from "./controllers";
import { log } from "node:console";

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  const comando = args._[0];

  if(comando === "add"){
    const peli = {
      id: Number(args.id),
      title: args.title,
      tags: Array.isArray(args.tags) ? args.tags : [args.tags],
    };
    const resultado = await controller.add(peli);
    console.log(resultado ? "Peli agregada:" : "No se pudo agregar la peli");
  } else if ( comando === "get"){
    if(args._[1]) {
      const peli = await controller.get({ id: Number(args._[1])});
      console.log(peli);
    } else {
      const pelis = await controller.get();
      console.log(pelis);
    } 
    } 
    else if (comando === "search"){
      const opcionesBusqueda: any = {};
      if(args.title) opcionesBusqueda.title = args.title;
      if(args.tag) opcionesBusqueda.tag = args.tag;

      const pelis = await controller.get({ search: opcionesBusqueda});
      console.log(pelis);
  } else {
    console.log("Comando no reconocido");
  }
  console.log(args);
  
}

main();
