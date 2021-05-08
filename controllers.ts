import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.data.getById(options.id);
    } else if (options.search) {
      return this.data.search(options.search);
    } else {
      return this.data.getAll().then((p) => p);
    }
  }
  add(peli: Peli) {
    return this.data.add(peli);
  }
}
export { PelisController };
