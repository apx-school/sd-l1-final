import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  async get(options: Options): Promise<Peli | Peli[]> {
    if (options?.id) {
      return await this.pelisCollection.getById(options.id);
    } else if (options?.search) {
      if (options.search.title && options.search.tag) {
        return this.pelisCollection.search(options.search);
      } else if (options.search.title) {
        return await this.pelisCollection.search({
          title: options.search.title,
        });
      } else if (options.search.tag) {
        return await this.pelisCollection.search({ tag: options.search.tag });
      }
    } else return await this.pelisCollection.getAll();
  }
  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}
export { PelisController };
