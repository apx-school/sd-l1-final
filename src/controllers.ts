import { PelisCollection, Peli } from "./models";

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
    this.model = new PelisCollection(); // Aca inicializamos el modelo.
  }

  async get(options?: Options): Promise<Peli[]> {
    if (options) {
      // 1. Buscar por ID
      if (options.id) {
        const peli = await this.model.getById(options.id);
        return peli ? [peli] : [];
      }

      // 2. Buscar por titulo y/o tag
      if (options.search) {
        const results = await this.model.search(options.search);
        return results;
      }
    }

    // 3. Devolver todas las peliculas si no hay opciones
    return this.model.getAll();
  }

  getOne(options: Options): Promise<Peli | undefined> {
    return this.get(options).then((results) => results[0]);
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.model.getById(peli.id);
    if (peliExistente) {
      console.log(`Error: Ya existe una pelicula con el ID ${peli.id}`);
      return false;
    }

    //Si no existe, agrega la nueva pelicula
    return this.model.add(peli);
  }

}

export { PelisController };

