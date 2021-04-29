import { PelisCollection, Peli } from "./models";

class PelisController {
  listaDePeliculas : PelisCollection;
  constructor() {
    this.listaDePeliculas = new PelisCollection();
  }
  //Métodos--
  get(options){
    if(options.id){
      return this.listaDePeliculas.getById(options.id);
    }else if(options.search.title){
      return this.listaDePeliculas.peliculas.filter((p) => p.title.includes(options.search.title));
    }else if(options.search.tag){
      return this.listaDePeliculas.peliculas.filter((p) => p.tags == options.search.tag)
    }else if(options.search.title && options.search.tag){
      return this.listaDePeliculas.peliculas.filter((p) => {
        p.title.includes(options.search.title) && p.tags.includes(options.search.tag )
      })
    }else {
      return this.listaDePeliculas.getAll()
    }
};
  add(peli:Peli){
    return this.listaDePeliculas.add(peli)
  };
}
export { PelisController };
