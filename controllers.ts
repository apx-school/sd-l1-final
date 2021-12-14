import { PelisCollection, Peli } from "./models";

// Instanciá el modelo PelisCollection y guardalo en una propiedad interna del controller.

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  get(options) {
    var resultado;
    if (options.tags && options.title) {
      resultado = this.data
        .search(options.search.title)
        .search(options.search.tags);
    } else if (options.id) {
      resultado = this.data.getById(options.id);
    } else if (options.search.title) {
      resultado = this.data.search(options.search.title);
    } else if (options.search.tags) {
      resultado = this.data.search(options.search.tags);
    } else {
      resultado = this.data.getAll();
    }

    return resultado;
  }
  add(peli: Peli) {
    // recibe un objeto y crea una peli en base a él.
    this.data.add(peli);
  }
}
export { PelisController };
