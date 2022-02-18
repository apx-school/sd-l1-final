import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  async get(options: any): Promise<any> {
    if (options.id) {
      return await this.pelisCollection.getById(options.id);
    }
    if (options.search) {
      return await this.pelisCollection.search(options.search);
    }
    return await this.pelisCollection.getAll();
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.pelisCollection.add(peli);
  }
}
export { PelisController };
