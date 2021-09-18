import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }

  get(options: any): Promise<any> {
    var resultado;
    if (options.id) {
      resultado = this.collection.getById(options.id).then((item) => {
        return item;
      });
    } else if (options.search) {
      resultado = this.collection.search(options.search).then((item) => {
        return item;
      });
    } else {
      resultado = this.collection.getAll().then((item) => {
        return item;
      });
    }
    return resultado;
  }
  add(peli: Peli): Promise<boolean> {
    return this.collection.add(peli).then((p) => {
      return p;
    });
  }
}

export { PelisController };
