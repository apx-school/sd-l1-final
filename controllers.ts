import { PelisCollection, Peli } from "./models";

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }
  async get(options) {
    if (options.id) {
      return await this.model.getById(options.id);
    }
    if (options.title) {
      return await this.model.search(options);
    }
    if (options.tag) {
      return await this.model.search(options);
    }
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}
export { PelisController };
