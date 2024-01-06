import * as minimist from 'minimist';
import { PelisController } from './controllers';
import { Peli } from './models';

async function main() {
  const pelisController = new PelisController();
  const args = minimist(process.argv.slice(2));
  const command = args._[0];

  switch (command) {
    case 'add':
      await handleAddCommand();
      break;
    case 'get':
      await handleGetCommand();
      break;
    case 'search':
      await handleSearchCommand();
      break;
    default:

      await handleDefaultCommand();
  }

  async function handleAddCommand() {
    const id = args.id;
    const title = args.title;
    const tags = args.tags;

    if (!id || !title || !tags) {
      console.error('Por favor, proporciona argumentos válidos para agregar una película.');
      return;
    }

    const newMovie: Peli = {
      id: parseInt(id as string),
      title: title as string,
      tags: Array.isArray(tags) ? tags : [tags as string],
    };

    const added = await pelisController.add(newMovie);
    if (added) {
      console.log('¡Película agregada exitosamente!');
    } else {
      console.error('Ya existe una película con el mismo ID o hubo un error al agregar.');
    }
  }

  async function handleGetCommand() {
    const id = args._[1];

    if (!id) {
      console.error('Por favor, proporciona un ID de película válido para obtener una película.');
      return;
    }

    const result = await pelisController.get({ id: parseInt(id as string) });
    console.log(`Película con ID ${id}:`, result);
  }

  async function handleSearchCommand() {
    const title = args.title;
    const tag = args.tag;

    const searchOptions: { title?: string; tag?: string } = {};

    if (title) {
      searchOptions.title = title as string;
    }

    if (tag) {
      searchOptions.tag = tag as string;
    }

    const result = await pelisController.get({ search: searchOptions });
    console.log('Resultados de búsqueda:', result);
  }

  async function handleDefaultCommand() {
    // Comando por defecto, devuelve todas las películas
    const result = await pelisController.get();
    console.log('Todas las películas:', result);
  }
}

main();