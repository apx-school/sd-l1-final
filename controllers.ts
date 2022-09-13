import { PelisCollection, Peli } from "./models";

class PelisController {
  model: any;
  constructor() {
    this.model = new PelisCollection();
  }
  async get(options): Promise<any> {
    if (options.id) {
      return await this.model.getById(options.id);
    }
    if (options.title) {
      return await this.model.search(options);
    }
    if (options.tags) {
      return await this.model.search(options);
    }
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}
export { PelisController };
