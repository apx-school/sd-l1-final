import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccion: PelisCollection;
  constructor() {
    this.coleccion = new PelisCollection();
  }
  get(options: any): Promise<any> {
    if (options.id) {
      return this.coleccion.getById(options.id).then((res) => {
        return res;
      });
    } else if (options.search) {
      return this.coleccion.search(options.search).then((res) => {
        return res;
      });
    } else {
      return this.coleccion.getAll().then((res) => {
        return res;
      });
    }
  }
  add(peli: Peli) {
    return this.coleccion.add(peli).then((res) => {
      return res;
    });
  }
}

export { PelisController };
/*
const prueba = new PelisController();
prueba.get({ search: { title: "a" } }).then((r) => {
  console.log(r);
});*/
