import { PelisCollection, Peli, SearchOptions } from "./models";

class PelisController {
  private pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection("./pelis.json");
  }

  async get(options?: { id?: number; search?: SearchOptions }): Promise<Peli[]> {
    if (options?.id !== undefined) {
      const pelicula = await this.pelisCollection.getById(options.id);
      return pelicula ? [pelicula] : [];
    } else if (options?.search) {
      return this.pelisCollection.search(options.search);
    } else {
      return this.pelisCollection.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelisCollection.add(peli);
  }
}

export { PelisController, PelisCollection, Peli };
