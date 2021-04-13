import { PelisCollection, Peli } from "./models";

class PelisController {
  controladorPelis: PelisCollection;

  constructor() {
    this.controladorPelis = new PelisCollection();
  }

  get(options): Promise<any> {
    if (options == null) {
      return this.controladorPelis.getAll();
    }

    if (options.id) {
      return this.controladorPelis.getById(options.id);
    }

    if (options.search) {
      return this.controladorPelis.search(options.search);
    }
  }

  add(peli): Promise<Boolean> {
    return this.controladorPelis.add(peli);
  }
}
export { PelisController };
