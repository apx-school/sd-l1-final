import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  get(option: any): Promise<any> {
    if (option.id) {
      return this.pelisCollection.getById(option.id).then((peli) => {
        return peli;
      });
    } else if (option.search) {
      return this.pelisCollection.search(option.search).then((peli) => {
        return peli;
      });
    } else {
      return this.pelisCollection.getAll().then((todaslasPelis) => {
        return todaslasPelis;
      });
    }
  }
  add(peli: Peli) {
    return this.pelisCollection.add(peli);
  }
}

export { PelisController };
