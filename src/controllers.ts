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

  async getAll(): Promise<Peli[]> {
    return this.model.getAll();
  }

  async get(options?: Options): Promise<Peli[]> {
    try {
      if (!options) {
        return await this.model.getAll();
      }

      if (options.id) {
        const peli = await this.model.getById(options.id);
        return peli ? [peli] : [];
      }

      if (options.search) {
        return await this.model.search(options.search);
      }

      return [];
    } catch (error) {
      console.error("Error al obtener las películas:", error);
      return [];
    }
  }

  async getOne(options: Options): Promise<Peli | null> {
    const peliculas = await this.get(options);
    return peliculas[0] || null;
  }

  async add(peli: Peli): Promise<string> {
    try {
      const resultado = await this.model.add(peli);
      if (resultado) {
        return "Película añadida con éxito";
      } else {
        return "Error: Ya existe una película con el mismo ID";
      }
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return "Error al agregar la película";
    }
  }
}

export { PelisController };