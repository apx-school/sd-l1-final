import { PelisCollection, Peli } from "./models";


class PelisController {
  data: Peli[] = [];
  collectionPelis: PelisCollection;
  constructor() {
    this.collectionPelis = new PelisCollection();
    this.collectionPelis.getAll();
  }
  get(options: any) {
    var resultado;
    if (options.id) {
      resultado = this.collectionPelis.getById(options.id);
    }
    if (options.search.title && options.search.tags) {
      resultado = this.collectionPelis.search(
        options.search.title && options.search.tags);
    }
    else if (options.search) {
      resultado = this.collectionPelis.search(options.search);

    } else if (options.search) {
      resultado = this.collectionPelis.search(options.search);
    }
    return resultado;
  }
  add(peli: Peli) {
    this.data.push(peli);
  }
}
export { PelisController };
