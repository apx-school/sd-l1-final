import { PelisCollection, Peli } from "./models";

class PelisController {
  modelo: PelisCollection;
  constructor() {
    this.modelo = new PelisCollection();
  }
  get(options: any): Promise<any> {
    if (options.id) {
      return this.modelo.getById(options.id);
    } else if (options.search && (options.search.title || options.search.tag)) {
      return this.modelo.search(options.search);
    } else {
      return this.modelo.getAll();
    }
  }
  add(peli: Peli) {
    return this.modelo.add(peli);
  }
}
export { PelisController };
