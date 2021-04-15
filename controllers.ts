import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection
  promise: Promise<any>;
  constructor(){
    this.pelis = new PelisCollection();
    const promise = this.pelis.getAll();
    this.promise = promise;
  }
  get(options) {
    var resultado;
    if ((options = "id")) {
      resultado = this.pelis.search(options);
      return resultado;
    } else {
      return this.pelis.getAll();
    }
  }
  add(peli) {
    this.pelis.add(peli);
  }
}
export { PelisController };
