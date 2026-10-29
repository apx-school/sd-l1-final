import minimist from "minimist";
import { PelisController, Options } from "./controllers";
import { Peli } from "./models";
import { argv, title } from "process";
import { timeLog } from "console";



///parseamos el codigo





async function main() {

  const parseo = minimist(process.argv.slice(2))


  const accion = parseo._[0]
  const idParseo = parseo.id
  const titleParseo = parseo.title
  // Si parseo.tag existe, verifica si es un array; si no, lo convierte en uno. Si no existe, usa un array vacío.
  const tagArrayParseo = parseo.tag ? (Array.isArray(parseo.tag) ? parseo.tag : [parseo.tag]) : [];

  console.log(accion);
  console.log(idParseo);
  console.log(titleParseo)
  console.log(tagArrayParseo)
  console.log(typeof (tagArrayParseo))



  const final = new PelisController();
  /// primero con add para agregar una pelicula

  if (accion === "add") {
    const tipoPeli: Peli = {
      id: idParseo,
      title: titleParseo,
      tags: tagArrayParseo
    }
    const idS = await final.add(tipoPeli)
    console.log(idS)
  }



  /// con este if camos a buscar por el id
  if (accion === "get") {
    const tipoPeli: Peli = {
      id: idParseo,
      title: undefined,
      tags: undefined
    }

    const idS = await final.getOne(tipoPeli)
    console.log(idS)
  }

  /// con este if voy a buscar por titulo y por tag si es necesario

  if (accion === "search") {
    const tipoPeli: Options = {
      id: undefined,
      search: {
        title: titleParseo,
        tags: tagArrayParseo
      }
    }
    const idS = await final.get(tipoPeli);
    console.log(tipoPeli);
    console.log(idS);
  }

}

main();


// ///# agrega peli (usando --tag)
// npx tsx src/index.ts add --id=3223 --title="cueva" --tag=dark --tag=terror
// npx tsx src/index.ts add --id=442211 --title="Título de la nueva peli" --tag=action --tag=classic


// # busca peli por id
// npx tsx index.ts get --id=4411 ookko

// # busca peli por título
// npx tsx index.ts search --title="dark"   okokok

// # busca peli por tag (puede repetirse)
// npx tsx index.ts search --tag=classic
// npx tsx index.ts search --tag=classic --tag=action

// # busca peli por tag y title
// npx tsx index.ts search --title="x" --tag=action

// # este último comando debe devolver todas las películas
// npx tsx index.ts search
