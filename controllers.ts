import { PelisCollection, Peli } from "./models";

class PelisController {
  dataModels: PelisCollection;
  dataPromesa: Promise<any>;
  constructor() {
    this.dataModels = new PelisCollection();
    const nuevapromesa = this.dataModels.getAll();
    this.dataPromesa = nuevapromesa;
  }

  get(options): Promise<any> {
    if (options.hasOwnProperty("id")) {
      return this.dataModels.getById(options);
    }
    if (options.hasOwnProperty("search")) {
      return this.dataModels.search(options.search);
    }
    return this.dataModels.getAll();
  }
  add(objeto) {
    this.dataModels.add(objeto);
  }
}

export { PelisController };
