import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options: any) {
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.search) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis.getAll();
    }
  }

  add(peli: Peli) {
    //{ id:4421, title:"Una peli", tags:["classic","action"] }
  }
}
export { PelisController };

const obj = new PelisController();
obj.get({ search: { title: "3", tags: "3" } }).then((r) => {
  console.log(r);
});
