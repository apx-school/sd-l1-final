import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options: any) {
    if (options.id) {
      return this.pelis.getById(options.id);
      /* } else if (options.year) {
      return this.pelis.getByYear(options.year); */
    } else if (options.search) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis.getAll();
    }
  }

  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
/* 
const ses = new PelisController();

ses.add({ id: 43, title: "Lego movie", tags: ["animacion"] }).then((res) => {
  console.log("SOY ADD", res);
});

ses.get({ search: { tags: "superheroes" } }).then((res) => {
  console.log("SOY GET", res);
}); */

// REVISAR CONTROLLERS.TESTS
