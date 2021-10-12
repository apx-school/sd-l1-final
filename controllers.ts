import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection; // 2) lo guardo en una propiedad interna

  constructor() {
    this.pelis = new PelisCollection(); // 1) instancio el modelo PelisCollections 
  }

  get(options:any) {
    let resultado;
    if(options.id) {
      resultado = this.pelis.getById(options.id);
    }else if(options.search) {
      resultado = this.pelis.search(options.search);
    }else {
      resultado = this.pelis.getAll();
    }
    return resultado;
  }

  add(peli:Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
