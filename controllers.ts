import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  // Metodo Constructor
  constructor() {
    this.data = new PelisCollection();
  }
  //Metodo para obtener peliculas, usando los metodos del modelo
  get(options): Promise<any> {
    // Si el objeto tiene un id
    if (options.id) {
      return this.data.getById(options.id).then((p) => {
        return p;
      });
    }
    // si el objeto tiene la propiedad search
    else if (options.search) {
      return this.data.search(options.search).then((p) => {
        return p;
      });
    }
    // Si no ingresamos ningun parametro
    else {
      return this.data.getAll().then((p) => {
        return p;
      });
    }
  }
  // Metodo para agregar una peli al json, usando los metodos del modelo
  add(peli: Peli) {
    return this.data.add(peli).then((p) => {
      return p;
    });
  }
}
export { PelisController };
