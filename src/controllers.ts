
import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  // Obtener películas según las opciones
  async get(options?: Options): Promise<Peli[]> {
    if (!options) {
      return this.model.getAll();
    }

    if (options.id !== undefined) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    if (options.search) {
      return this.model.search(options.search);
    }

    return this.model.getAll();
  }

  // Obtener una sola película
  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  // Agregar una película
  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };
