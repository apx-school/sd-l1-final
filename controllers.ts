import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options?: any): Promise<any> {
    if (options.id) {
      return this.pelis.getById(options.id)
      .then((x) => {
        return x;
      });
    } else if (options.search) {
      return this.pelis.search(options.search).then((x) => {
        return x;
      });
    } else {
      return this.pelis.getAll().then((x) => {
        return x;
      })
    }
  }
  add(peli: Peli) {
    return this.pelis.add(peli).then((x) => {
      return x;
    });
  }
}


export { PelisController };
