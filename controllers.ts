import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  async get(options?): Promise<any> {
    if (options.id) {
      return await this.pelisCollection.getById(options.id)}
    if (options.search) {
      return await this.pelisCollection.search(options.search)
    } else {
      return await this.pelisCollection.getAll();
    }
  }
  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}
export { PelisController };
