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
    const newModel = new PelisCollection();
    this.model = newModel;
    this.init();
  }
  async init() {
    await this.model.load();
  }
  get(options?: Options): Peli[] {
    if (options?.search?.title && options.search.tag) {
      return this.model.search({
        title: options.search.title,
        tag: options.search.tag,
      });
    } else if (options?.id) {
      const res = this.model.getById(options.id);
      return res;
    } else if (options?.search.title) {
      return this.model.search({ title: options.search.title });
    } else if (options?.search.tag) {
      return this.model.search({ tag: options.search.tag });
    } else {
      return this.model.getAll();
    }
  }
  getOne(options: Options) {
    const res = this.get(options);
    if (res.length > 1) {
      return res[0];
    } else {
      return res;
    }
  }
  async add(el: Peli) {
    await this.model.load();
    const res = await this.model.add(el);
    return res;
  }
}

export { PelisController };
