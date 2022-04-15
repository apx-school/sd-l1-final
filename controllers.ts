import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  promesa: Promise<any>;
  constructor() {
    this.data = new PelisCollection();
    const promesa = this.data.getAll();
    this.promesa = promesa;
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.data.getById(options.id);
    }
    if (options.search) {
      return this.data.search(options.search);
    } else {
      return this.data.getAll();
    }
  }

  add(peliNueva) {
    return this.data.add(peliNueva);
  }
}
export { PelisController };
