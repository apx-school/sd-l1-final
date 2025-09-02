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
    const disparador = options;
    if (disparador?.id) {
      try {
        const peli = await this.model.getById(disparador.id);
        return peli ? [peli] : [];
      } catch (error) {
        console.log("No se encontro la pelicula!.");
        throw error;
      }
    } else if (disparador.search && typeof disparador.search === "object") {
      return await this.model.search(disparador.search);
    } else {
      return await this.model.getAll();
    }
  }
  async getOne(options: Options): Promise<Peli | undefined> {
    try {
      const result = await this.get(options);
      return result[0];
    } catch (error) {
      console.error("Error al obtener una película:", error);
      throw error;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const result = await this.model.add(peli);
    return result;
  }
}

export { PelisController };
