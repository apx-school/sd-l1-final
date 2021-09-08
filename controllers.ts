import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promise: Promise<any>;
  constructor() {
    this.pelis = new PelisCollection();
    const promise = this.pelis.getAll();
    this.promise = promise;
  }
  get(options) {
    var resultado;
    if (options.id) {
      resultado = this.pelis.getById(options.id);
      resultado.then((r) => console.log(r));
    } else if (options.title || options.tag) {
      resultado = this.pelis.search(options);
      resultado.then((r) => console.log(r));
    } else {
      resultado = this.pelis.getAll();
      resultado.then((r) => console.log(r));
    }

    return resultado;
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
