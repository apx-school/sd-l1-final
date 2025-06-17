import { title } from "process";
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
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    if (options?.search) {
      if (options.search.title && options.search.tag) {
        return await this.model.search({
          title: options.search.title,
          tag: options.search.tag,
        });
      }
      if (options.search.title) {
        return await this.model.search({ title: options.search.title });
      }

      if (options.search.tag) {
        return await this.model.search({ tag: options.search.tag });
      }
    }
    return await this.model.getAll();
  }

  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  async add(Peli: Peli): Promise<boolean> {
    return await this.model.add(Peli);
  }
}
export { PelisController, Options };
