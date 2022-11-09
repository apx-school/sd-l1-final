import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.search.title) {
      return this.pelis.search(options.search);
    } else if (options.search.tag) {
      return this.pelis.search(options.search);
    }
    // else {
    //   return this.pelis.getAll();
    //   // const a = this.pelis.getAll();
    //   // console.log(a);
    //   // return a;
    // }
  }
  add(peli: Peli) {
    return this.add(peli);
  }
}

export { PelisController };
