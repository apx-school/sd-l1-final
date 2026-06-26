import { PelisCollection, Peli, SearchOptions } from "./models";

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

  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  async get(options: Options): Promise<Peli[]> {
    if (options.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : []; // Devuelve un array con la peli o vacío
    }
    if (options.search) {
      return this.model.search(options.search); // Asumiendo que implementaste el método search
    }
    return this.model.getAll(); // Devuelve todas las pelis
  }

  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }

  search(options: SearchOptions): Promise<Peli[]> {
    return this.model.search(options);
  }
}

export { PelisController };
