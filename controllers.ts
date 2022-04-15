import { title } from "process";
import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options: any) {
    if (options.search) {
      return this.pelis.search(options.search);
    } else if (options.id) {
      return this.pelis.getById(options.id);
    } else {
      return this.pelis.getAll();
    }
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}

export { PelisController };
