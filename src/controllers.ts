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
    try {
      if (options?.id) {
        const movie = await this.model.getById(options.id);
        return movie ? [movie] : [];
      } else if (options?.search) {
        return await this.model.search(options.search);
      }

      return await this.model.getAll();
    } catch (error) {
      console.error("Error al obtener peliculas:", error);
      return [];
    }
  }

  async getOne(options: Options): Promise<Peli | null> {
    const movies = await this.get(options);
    return movies.length > 0 ? movies[0] : null;
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      return await this.model.add(peli);
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false;
    }
  }
}

export { PelisController };
