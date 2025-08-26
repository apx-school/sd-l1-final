import { PelisCollection, Peli } from "./models";

type Options = {
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

  async get(options?: Options): Promise<Peli[]> {
    if (!options) {
      // Si no hay opciones, devolver todas las películas
      return this.model.getAll();
    }

    if (options.id) {
      // Si hay id, buscar por id
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    if (options.search) {
      // Si hay opciones de búsqueda, usar el método search
      return this.model.search(options.search);
    }

    // Si no coincide con ninguna opción, devolver todas
    return this.model.getAll();
  }

  async getOne(options: Options): Promise<Peli> {
    const results = await this.get(options);
    return results[0];
  }

  add(peli: Peli) {
    return this.model.add(peli);
  }
}
export { PelisController };
