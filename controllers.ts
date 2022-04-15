import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options): Promise<any> {
    let resultado: Promise<any>;
    if (options.get) {
      resultado = this.pelis.getById(options.get);
    } else if (options.id) {
      resultado = this.pelis.getById(options.id);
    } else if (options.search) {
      // console.log("conso q recibe search", options);
      resultado = this.pelis.search(options.search);
    } else {
      resultado = this.pelis.getAll().then((pel) => {
        return pel;
      });
    }

    return resultado;
  }

  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
