import { PelisCollection, Peli } from "./models";

// Definir claramente los parámetros para búsqueda
class Options {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {

  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  // Obtener películas según las opciones proporcionadas
  async get(options?: Options): Promise<Peli[]> {
    if (options) {
      // 1. Buscar por ID
      if (options.id) {
        const peli = await this.model.getById(options.id);
        return peli ? [peli] : [];
      }

      // 2. Buscar por título y/o etiquetas
      if (options.search) {
        const results = await this.model.search(options.search);
        return results;
      }
    }
    // 3. Devolver todas las películas si no se pasa ninguna opción
    return this.model.getAll();
  }

  // Obtener una película por ID
  async getOne(options: Options): Promise<Peli | undefined> {
    if (!options.id) return undefined;
    return this.model.getById(options.id);
  }

  // Agregar una película
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.model.getById(peli.id);
    if (peliExistente) {
      console.log(`Error: Ya existe una película con el ID ${peli.id}`);
      return false;
    }

    // Si no existe, agrega la nueva película
    const success = await this.model.add(peli);

    // Actualizar el archivo pelis.json si la película fue agregada correctamente
    if (success) {
      console.log(`Película con ID ${peli.id} agregada con éxito.`);
    }

    return success;
  }

}

export { PelisController };