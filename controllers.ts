import { PelisCollection, Peli } from "./models";


class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  processOptions(options){
    if(options._.includes("get"||"search")){
      return this.get(options);
    }else if (options._.includes("add")){
      let nuevaPeli = new Peli();
      nuevaPeli.id = options.id;
      nuevaPeli.title = options.title;
      nuevaPeli.tags = options.tags;
      return this.add(nuevaPeli);
    }else{
      return this.pelis.getAll();
    }
  }
  get(options){
    let resultado:Promise<any>;
    if(options.id){
      resultado = this.pelis.getById(options.id);
    }else if(options.search){
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
