import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection
  constructor() {
    this.pelis = new PelisCollection;
  }
  async get(options){
    if(options.id){
      const busquedaId = await this.pelis.getById(options.id)
      return busquedaId;
    }
    else if(options.search.title && options.search.tag){
      const busquedaTitleYTag = await this.pelis.search({title: options.search.title, tag: options.search.tag})
      return busquedaTitleYTag;
    }
    else if(options.search.title){
      const busquedaTitle = await this.pelis.search({title: options.search.title});
      return busquedaTitle;
    }
    else if(options.search.tag){
      const busquedaTag = await this.pelis.search({tag: options.search.tag})
      return busquedaTag;
    }
    else {
      const resultado = await this.pelis.getAll();
      return resultado;
    }
  }
  async add(peli:Peli){
    const resultado = await this.pelis.add(peli)
    return resultado;
  }
}
export { PelisController };
