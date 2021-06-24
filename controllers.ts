import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccion: PelisCollection;
  constructor() {
    this.coleccion = new PelisCollection();
  }
  get(options: any) {
    if (options.id) {
      return this.coleccion.getById(options.id);
    } else if (options.search) {
      return this.coleccion.search(options.search);
    } else if (options.add) {
      return this.coleccion.add(options.add);
    } else {
      return this.coleccion.getAll();
    }
  }
}

export { PelisController };
/*
const controllerTest = new PelisController();

//const nuevaPeli = new Peli(133, "la llorona2", ["terror"]);

controllerTest.get({ id: 3 }).then((res) => {
  console.log(res);
});

controllerTest.get({ add: { nuevaPeli } }).then((res) => {
  console.log(res);
});


controllerTest.get({ search: { tag: "accion", title: "r" } }).then((res) => {
  console.log(res);
});
*/
