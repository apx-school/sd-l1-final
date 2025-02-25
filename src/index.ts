import minimist from 'minimist';
import { MovieController } from './controllers';
import { Movie } from './models';

interface CommandParams {
  _: string[];
  id?: string;
  title?: string;
  tags?: string[];
  tag?: string;
}

function parseParams(argv: string[]): CommandParams {
  return minimist(argv);
}

async function main() {
  const params = parseParams(process.argv.slice(2));
  const movieController = new MovieController();

  const action = params._[0];
  const { id, title, tags, tag } = params;

  try {
    switch (action) {
      case 'add': {
        if (!id || !title || !tags) {
          throw new Error(
            'Se requieren id, título y tags para agregar una película',
          );
        }
        await movieController.add({ id: +id, title, tags });
        console.log('Película agregada exitosamente');
        break;
      }

      case 'get': {
        const movieId = +params._[1];
        if (!movieId) {
          throw new Error('Se requiere un ID para obtener una película');
        }
        const movie = await movieController.getOne({ id: movieId });
        if (!movie) {
          console.log('No se encontró la película');
        } else {
          console.table(movie);
        }
        break;
      }

      case 'search': {
        const movies = await movieController.get({ search: { title, tag } });
        if (movies.length === 0) {
          console.log('No se encontraron películas');
        } else {
          console.table(movies);
        }
        break;
      }

      default: {
        const movies = await movieController.get({});
        if (movies.length === 0) {
          console.log('No hay películas en la colección');
        } else {
          console.table(movies);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
