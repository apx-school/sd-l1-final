import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options): Promise<any> {//cuando dice que recibe un objeto se refiere a options en este caso que seria el parametro que recibe el metodo
    if (options.id) {
      return this.pelisCollection.getById(options.id).then(resultado => {
        return resultado
      });
    }
    else if (options.search) {
      return this.pelisCollection.search(options.search).then(resultado => {
        return resultado
      });
    }
    else {
      return this.pelisCollection.getAll().then(resultado => {
        return resultado
      });
    }
  }

  add(peli: Peli) {
    return this.pelisCollection.add(peli).then(resultado => {
      return resultado
    });
  }
}
export { PelisController };
