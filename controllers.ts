import { PelisCollection, Peli } from "./models";


class PelisController {
  collectionPelis: PelisCollection;
  constructor() {
    this.collectionPelis = new PelisCollection();
  };
  get(options: any): Promise<any> {
    if (options.search) {
      const FoundedPeli = this.collectionPelis.search(options.search).then((p) => {
        return p;
      });
      return FoundedPeli;
    }
    else if (options._ == "get") {
      return this.collectionPelis.getById(
        options.id).then((p) => { return p });
    }
    else if (options.id) {
      return this.collectionPelis.getById(options.id).then((p) => {
        return p;
      });

    } else return this.collectionPelis.getAll().then((p) => {
      return p;
    });
  }
  add(peli: Peli) {
    return this.collectionPelis.add(peli);
  }
}

export { PelisController };
