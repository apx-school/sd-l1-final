import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  async get(options: any) {
    if (options.id) {
      return await this.data.getById(options.id);
    } else if (options.search) {
      return await this.data.search(options.search);
    } else {
      return await this.data.getAll();
    }
  }
  add(peli: Peli) {
    return this.data.add(peli);
  }
}
export { PelisController };
