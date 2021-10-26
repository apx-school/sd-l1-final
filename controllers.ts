import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccionPelis : PelisCollection;

  constructor() {
    this.coleccionPelis = new PelisCollection();
  }

  //get(options) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
  get(options){
    if(options.id){
     return this.coleccionPelis.getById(options.id);
    } else if (options.search.title && options.searc.tag){
     return this.coleccionPelis.search(options.search.title && options.searc.tag)
    } else if (options.search.title) {
      return this.coleccionPelis.search(options.search.title)
    } else if (options.search.tag){
      return this.coleccionPelis.search(options.search.tag)
    } else {
      return this.coleccionPelis.getAll();
    }
  }

  add(peli:Peli){
    return this.coleccionPelis.add(peli);
  }

}
export { PelisController };
