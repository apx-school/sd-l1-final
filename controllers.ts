import { PelisCollection, Peli } from "./models";

class PelisController {
  listaPelis: PelisCollection;

  constructor() {
    this.listaPelis = new PelisCollection();
  }

  get(options) {
    //si la opcion id existe entra
    if (options.id) {
      return this.listaPelis.getById(options.id);
    }
    //si existe, title o tag, o incluso ambas entra
    if (options.search.title && options.search.tag) {
      var soloTag = { tag: options.search.tag };
      return this.listaPelis.search(soloTag).then((peliculas) => {
        return peliculas.filter((peli) => {
          if (peli.title.includes(options.search.title)) {
            return peli;
          }
        });
      });
      //solo titulo
    } else if (options.search.title && options.search.tag == undefined) {
      return this.listaPelis.search(options.search);
      //solo tag
    } else if (options.search.tag && options.search.title == undefined) {
      return this.listaPelis.search(options.search);
    }
    //si no hay ni id, title o tag, entonce retorna todas las pelis
    if (
      options.id == undefined &&
      options.title == undefined &&
      options.tags == undefined
    ) {
      return this.listaPelis.getAll();
    }
  }

  add(peli: Peli) {
    return this.listaPelis.add(peli);
  }
}

export { PelisController };
