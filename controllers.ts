import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  processOptions(options){
    if(options.search || options.id){
      return this.get(options);
    }else if (options.add){
      return this.add(options.add);
    }else{
      return this.pelis.getAll();
    }
  }
  get(options){
    let resultado:Promise<any>;
    if(options.id){
      resultado = this.pelis.getById(options.id);
    }else if(options.search.title || options.search.tag){
      resultado = this.pelis.search(options.search);
    }else {
      resultado = this.pelis.getAll();
    }
    return resultado;
  }
  add(options:Peli){
    return this.pelis.add(options);
  }
}
export { PelisController };