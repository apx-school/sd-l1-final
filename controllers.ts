import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccionDePelis: PelisCollection;

  constructor() {
    this.coleccionDePelis = new PelisCollection();
  }

  get(option: any) {
    let resultado: Promise<any>;
    if (option.hasOwnProperty("search")) {
      resultado = this.coleccionDePelis.search(option.search);
    } else if (option.hasOwnProperty("id")) {
      resultado = this.coleccionDePelis.getById(option.id);
    } else {
      resultado = this.coleccionDePelis.getAll();
    }

    return resultado;
  }
  add(option: Peli) {
    if (option.id && option.title && option.tags) {
      return this.coleccionDePelis.add(option);
    }
  }
}
export { PelisController };
