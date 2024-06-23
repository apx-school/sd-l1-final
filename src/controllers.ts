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
  async get(params: Options): Promise<Peli[]> {
    if (params.id) {
      const respuesta = await this.collection.getById(params.id);
      return [respuesta];
    }
    if (params.search) {
      if (params.search.title && params.search.tag) {
        const search = { title: params.search.title, tag: params.search.tag };
        const respuesta = await this.collection.search(search);
        return respuesta;
      } else if (params.search.title) {
        const search = { title: params.search.title };
        const respuesta = await this.collection.search(search);
        return respuesta;
      } else if (params.search.tag) {
        const search = { tag: params.search.tag };
        const respuesta = await this.collection.search(search);
        return respuesta;
      }
    } else {
      const respuesta = await this.collection.getAll();
      return respuesta;
    }
  }
  async add(params: Peli) {
    const respuesta = await this.collection.add(params);
    return respuesta;
  }
}

export { PelisController, Options };
