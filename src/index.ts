import minimist from "minimist";
import { PelisController } from "./controllers";

async function main() {
  const controller = new PelisController();
  const args = minimist(process.argv.slice(2));

  const comando = args._[0];

  if (comando === "add") {
    const id = Number(args.id);
    const title = args.title;
    const tags = Array.isArray(args.tags) ? args.tags : [args.tags];

    const peli = { id, title, tags };

    const resultado = await controller.add(peli);

    if (resultado) {
      console.log("Película agregada con éxito");
    } else {
      console.log("No se pudo agregar la película (id duplicado o error)");
    }
  }

  if (comando === "get") {
    const id = Number(args._[1]);
    if (!isNaN(id)) {
      const peli = await controller.getOne({ id });
      if (peli) {
        console.log("Película encontrada:", peli);
      } else {
        console.log("No se encontró la película con ese ID");
      }
    } else {
      console.log("Proporciona un ID válido");
    }
  }
  if (comando === "search"){
    const title = args.title;
    const tag = args.tag;
    const opciones: any = {};  
    if (title)opciones.search = {...opciones.search, title}
    if(tag)opciones.search = {...opciones.search, tag};

    const resultados = await controller.get(opciones);
    if(resultados.length> 0){
      console.log("Películas encontradas:", resultados);
    } else{
      console.log("No se encontraron películas con esos criterios");}
  
  }
    if (!comando) {
    const all = await controller.get();
    console.log("Todas las pelis:", all);
  }


}

main();
