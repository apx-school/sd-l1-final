import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options: any) {
    if (options.id) {
      //{ id:1234 }
      return this.pelis.getById(options.id);
    } else if (options.search) {
      //{ search:{ title:"ju" }
      return this.pelis.search(options.search);
    } else {
      //{}
      return this.pelis.getAll();
    }
  }

  add(peli: Peli) {
    //{ id:4421, title:"Una peli", tags:["classic","action"] }
    return this.pelis.add(peli);
  }
}
export { PelisController };
