import { PelisCollection, Peli } from "./models";

//Peliscolletion instancia
const Pcollection = new PelisCollection();

//Declaración de tipo nuevo
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  constructor() {}

  get(options?: Options) {
    //Chequear la existencia de argunmentos
    if (options) {
      //Busqueda por id
      if (options.id) {
        Pcollection.getById(options.id);
      }

      //Busqueda por titulo
      else if (options.search.title && !options.search.tag) {
        Pcollection.search({ title: options.search.title });
      }

      //Busqueda por tag
      else if (!options.search.title && options.search.tag) {
        Pcollection.search({ tag: options.search.tag });
      }

      //Busqueda por título y tag
      else if (options.search.tag && options.search.title) {
        Pcollection.search({
          title: options.search.title,
          tag: options.search.tag,
        });
      }
    }

    //Si no hay argumentos mostrar todo.
    else {
      Pcollection.getAll();
    }
  }
}
export { PelisController };
