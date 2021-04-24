import { PelisCollection, Peli } from "./models";

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
    if (options.id) {
      return this.pelis.getById(options.id);
    }
    if (options.title) {
      return this.pelis.getAll().then(() => {
        return this.pelis.search(options);
      });
    }
    if (options.tags) {
      return this.pelis.getAll().then(() => {
        return this.pelis.search(options);
      });
    }
  }

  add(options: any) {
    let peli = new Peli();

    peli.id = options.id;
    peli.title = options.title;
    peli.tags = options.tags;

    return this.pelis.add(peli);
  }
}

export { PelisController };
