import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";


async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if(args._[0] === 'get'){
    const id = parseInt(args.id);
    const movie = await controller.get(id);
    console.log(movie);
  } else if (args._[0] === 'search'){
    if(args.title && args.tag) {
      const movies = await controller.getByTagAndTitle(args.tag, args.title);
      console.log(movies);
    } else if (args.title){
      const movies = await controller.getByTitle(args.title);
      console.log(movies);
    } else if(args.tag){
      const movies = await controller.getByTag(args.tag);
      console.log(movies);
    } else {
      console.log('Por favor, ingresar un criterio valido de busqueda');
    }
  } else if(args._[0] === 'add'){
    const newMovie = new Peli();
    newMovie.id = args.id;
    newMovie.title = args.title;
    newMovie.tags = args.tag.split(',');

    const add = await controller.add(newMovie);
    console.log(add, 'Pelicula agregada correctamente');

    } else {
      const allMovies = await controller.getMovies();
      console.log(allMovies);
    }
}

//para agregar peliculas --> ts-node index.ts add --id=5 --title="El rey leon" --tag=drama, musical
//buscar por si id --> ts-node index.ts get --d=4
//buscar por titulo --> ts-node index.ts search --title="a"
//buscar por tag --> ts-node index.ts search --tag="classic"
//buscar por tag y titulo --> ts-node index.ts search --title="x" --tag="action"

main();
