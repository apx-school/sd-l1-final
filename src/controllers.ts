import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[] | Peli | undefined> {
    if (options?.id) {
      return await this.collection.getById(options.id);
    }

    if (options?.search) {
      return await this.collection.search(options.search);
    }

    return await this.collection.getAll();
  }
async getOne(options: Options): Promise<Peli | undefined> {
  const resultado = await this.get(options);
  if (Array.isArray(resultado)) {
    return resultado[0];   // devuelve el primer elemento si es array
  }
  return resultado;        // si ya vino como Peli | undefined
}
  async add(peli: Peli): Promise<boolean> {
    return await this.collection.add(peli);
  }
}

export { PelisController };
