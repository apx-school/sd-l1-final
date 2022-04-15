import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options: any): Promise<any> {
    var resultado;
    if (options.id) {
      resultado = this.pelis.getById(options.id).then((item) => {
        return item;
      });
    } else if (options.search) {
      resultado = this.pelis.search(options.search).then((item) => {
        return item;
      });
    } else {
      resultado = this.pelis.getAll().then((item) => {
        return item;
      });
    }
    return resultado;
  }
  add(peli: Peli): Promise<boolean> {
    return this.pelis.add(peli).then((p) => {
      return p;
    });
  }
}

export { PelisController };
