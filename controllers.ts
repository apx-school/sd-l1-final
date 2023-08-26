import { PelisCollection, Peli } from './models';

export type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelisCollections: PelisCollection;
  constructor() {
    this.pelisCollections = new PelisCollection();
  }
  async get(options?: Options) {
    if (options.id) {
      return await this.pelisCollections.getById(options.id);
    }
    if (options.search)
      return await this.pelisCollections.search({ ...options.search });
  }
  async add(peli: Peli) {
    return await this.pelisCollections.add(peli);
  }
}
export { PelisController };
