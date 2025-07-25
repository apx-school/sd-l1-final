import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  // Se crea una propiedad interna model con una nueva instancia de PelisCollection
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  // Si recibe id, busca por id. Si recibe search, busca por título y/o tag.
  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      // Si encontró una peli, la devuelve en array; si no, array vacío
      return peli ? [peli] : [];
    }
    if (options?.search) {
      return await this.model.search(options.search);
    }
    // Si no recibe nada, devuelve todas las pelis
    return await this.model.getAll();
  }

  // Devuelve solo una peli: la primera del resultado de get
  async getOne(options: Options): Promise<Peli> {
    const results = await this.get(options);
    return results[0];
  }

  // Usa el método add del modelo para agregar una peli nueva
  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}

export { PelisController };
