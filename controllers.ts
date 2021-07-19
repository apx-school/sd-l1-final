import { PelisCollection, Peli } from "./models";

class PelisController {
  peliscoll: PelisCollection;
  constructor() {
    this.peliscoll = new PelisCollection();
  }
  get(options: any) {
    if (options.id) {
      return this.peliscoll.getById(options.id);
    } else if (options.search) {
      return this.peliscoll.search(options.search);
    } else {
      return this.peliscoll.getAll().then((todas) => {
        return todas;
      });
    }
  }
  add(peli: Peli) {
    return this.peliscoll.add(peli);
  }
}
export { PelisController };
const prob = new PelisController();
// prob
//   .get({ search: { title: "a", tags: "comedia" } })
//   .then((a) => console.log(a));
// prob
// .add({ id: 34, title: "sarasa", tags: ["accion", "fantasia"] })
// .then((a) => console.log(a));
