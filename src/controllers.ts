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
    // Devuelve todas las pelis si no hay opciones
    if (!options) {
      return await this.model.getAll();
    }
    //Primero hacer la busqueda por id
    if (options.id) {
      const searchById = await this.model.getById(options.id);
      return searchById ? [searchById] : [];
      // Si no hay id hacer la busqueda por search
    } else if (options.search) {
      //si solo recibe la propiedad tag
      //si solo recibe la propiedad title
      //si recibe la propiedad tag y title busca por ambas
      const searchResults = await this.model.search(options.search);
      return searchResults;
    }
    // Si no hay id ni search, devuelve un array vacío
    return [];
  }

  async getOne(options: Options): Promise<Peli> {
    const resultado = await this.get(options);
    return resultado[0];
  }

  async add(peli: Peli) {
    return await this.model.add(peli);
  }
}

export { PelisController };
