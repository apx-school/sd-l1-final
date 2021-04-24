import { PelisCollection, Peli } from "./models";

function crearPeli(obj) {
  let aux = new Peli();
  aux.id = obj.peli.id;
  aux.title = obj.peli.title;
  aux.tags = obj.peli.tags;
  return aux;
}

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.pelis = new PelisCollection();
    let promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  get(options: any) {
    if (options.action == "esta vacio") {
      return this.pelis.getAll();
    }
    if (options.action == "get") {
      return this.pelis.getById(options.id);
    }
    if (options.action == "search" && options.params == "title") {
      return this.pelis.getAll().then(() => {
        return this.pelis.search(options.params, options.do);
      });
    }
    if (options.action == "search" && options.params == "tags") {
      return this.pelis.getAll().then(() => {
        return this.pelis.search(options.params, options.do);
      });
    }
  }

  add(options: any) {
    let peli = new Peli();
    let promesa = new Promise((peli) => {
      peli.id = options.peli.id;
      peli.title = options.peli.title;
      peli.tags = options.peli.tags;
      return peli;
    });
    return this.pelis
      .getAll()
      .then(() => {})
      .then(() => {
        return this.pelis.add(peli);
      });
  }
}

export { PelisController };
