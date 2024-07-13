import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  coll: PelisCollection;
  constructor() {
    const nuevo = new PelisCollection();
    this.coll = nuevo;
  }

  async get(options?: Options) {
    if (options?.id !== undefined) {
      return await this.coll.getById(options.id);
    } else if (options?.search?.title) {
      return await this.coll.search(options.search);
    } else if (options?.search?.tag) {
      return await this.coll.search(options.search);
    } else if (options?.search?.tag && options?.search?.title) {
      return await this.coll.search(options.search);
    } else {
      return await this.coll.getAll();
    }
  }

  async add(peli: Peli) {
    const added = await this.coll.add(peli);
    if (added) {
      console.log("Película añadida correctamente");
    } else {
      console.log("Error al añadir película: ID repetido");
    }
  }
}

export { PelisController };
