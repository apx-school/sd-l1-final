import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.pelis = new PelisCollection();
    const promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  get(options: any) {
    var resultado: Promise<any>;

    if (options.id) {
      resultado = this.pelis.getById(options.id).then((pel) => {
        return pel;
      });
      return resultado;
    } else if (options.add) {
      resultado = this.pelis.add(options.add).then((pel) => {
        return pel;
      });
      return resultado;
    } else if (options.search) {
      if (options.search.title) {
        resultado = this.pelis.search(options.search.title).then((pel) => {
          return pel;
        });
      } else if (options.search.tags) {
        resultado = this.pelis.search(options.search.tags).then((pel) => {
          return pel;
        });
      }
    } else if (options.search.title && options.search.tags) {
      resultado = this.pelis.search(options.search.title).then((pel) => {
        return pel;
      });
      resultado = this.pelis.search(options.search.tags).then((pel) => {
        return pel;
      });
      return resultado;
    } else {
      resultado = this.pelis.getAll().then((pel) => {
        return pel;
      });
    }
    return resultado;
  }

  add(options) {}
}
export { PelisController };
