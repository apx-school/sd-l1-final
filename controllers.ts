import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;
  constructor() {
    const pelis = new PelisCollection();
    this.pelis = pelis;
    var promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  get(options: any) {
    var resultado;
    if (options.id) {
      resultado = this.pelis.getById(options.id);
      return resultado;
    }
    if (options.search) {
      resultado = this.pelis.search(options.search);
      return resultado;
    } else {
      resultado = this.pelis.getAll();
      return resultado;
    }
  }
  add(peli: Peli) {
    return this.pelis.add(peli).then((resultado) => {
      return resultado;
    });
  }
}

export { PelisController };
