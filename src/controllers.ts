
import { PelisCollection, Peli, SearchOptions } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private collection: PelisCollection;

  constructor(collection: PelisCollection = new PelisCollection) {
    this.collection = collection;
  }

  async get(options?: Options): Promise<any[] | any | undefined> {
    try {
      if (options?.id !== undefined) {
        return await this.collection.getById(options.id);
      } else if (options?.search?.title) {
        const searchOptions: SearchOptions = { title: options.search.title };
        return await this.collection.search(searchOptions);
      } else if (options?.search?.tag) {
        const searchOptions: SearchOptions = { tag: options.search.tag };
        return await this.collection.search(searchOptions);
      } else {
        return await this.collection.getAll();
      }
    } catch (error) {
      console.error("Error al obtener las películas:", error);
      return undefined;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      return await this.collection.add(peli);
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false;
    }
  }
}

export { PelisController };

const collection = new PelisCollection("pelis.json");


const controller = new PelisController(collection);