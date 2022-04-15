import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promise: Promise<any>;
  constructor() {
    this.pelis = new PelisCollection();
    const promise = this.pelis.getAll();
    this.promise = promise;
  }
  get(options: any): Promise<any> {
    var resultado;
    if (options.id) {
      resultado = this.pelis.getById(options.id).then((r) => {
        return r;
      });
    } else if (options.search) {
      resultado = this.pelis.search(options.search).then((r) => {
        return r;
      });
    } else {
      resultado = this.pelis.getAll().then((r) => {
        return r;
      });
    }
    return resultado;
  }
  add(peli: Peli): Promise<any> {
    return this.pelis.add(peli).then((result) => {
      return result;
    });
  }
}
export { PelisController };
