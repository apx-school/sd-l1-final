import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options): Promise<any> {//cuando dice que recibe un objeto se refiere a options en este caso que seria el parametro que recibe el metodo
    if (options.id) {
      return this.pelisCollection.getById(options.id) //borré todas las promesas que le pasé a cada if del metodo "get"

    }
    else if (options.search) {
      return this.pelisCollection.search(options.search)

    }
    else {
      return this.pelisCollection.getAll()
    }
  }

  add(peli: Peli) {
    return this.pelisCollection.add(peli)
  }
}
export { PelisController };
