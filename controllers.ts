import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.data.getById(options.id).then((res) => res);
    } else if (options.search) {
      return this.data.search(options.search).then((r) => r);
    } else {
      return this.data.getAll();
    }
  }
  add(peli: Peli) {
    return this.data.add(peli).then((res) => res);
  }
}
export { PelisController };
