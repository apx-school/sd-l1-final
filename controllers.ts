import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;

  constructor() {
    this.data = new PelisCollection();
  }

  get(options: any) {
    if (options.id) {
      return this.data.getById(options.id);
    } else if (options.search) {
      return this.data.search(options.search);
    } else {
      return this.data.getAll();
    }
  }
  
  add(peli: Peli) {
    this.data.add(peli);
    return true
  }
}

export { PelisController };
