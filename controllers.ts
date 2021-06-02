import { PelisCollection, Peli } from "./models";

class Options {
  id: number;
  search?: {
    title?: string;
    tag?: string;
  } = {};
}

class PelisController {
  modelo: PelisCollection;
  constructor() {
    const modelo = new PelisCollection();
    this.modelo = modelo;
  }
  get(options: Options) {
    if (options.id) {
      return this.modelo.getById(options.id).then((resultado) => {
        return resultado;
      });
    }

    if (options.search.title || options.search.tag) {
      return this.modelo.search(options.search).then((resultado) => {
        return resultado;
      });
    }

    if (options.id == undefined && options.search == undefined) {
      return this.modelo.getAll().then((resultado) => {
        return resultado;
      });
    }
  }
}
export { PelisController };

// MOCK

const controller = new PelisController();
const opciones = new Options();
// opciones.id = 3;

// opciones.search.tag = "o";
const resultado = controller.get(opciones);

resultado.then((resuelto) => {
  console.log(resuelto);
});
