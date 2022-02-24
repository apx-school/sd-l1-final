import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas:PelisCollection ;

  constructor() {
   this.peliculas = new PelisCollection(); 
  }
  get(options:any){
    if (options.id){
      return this.peliculas.getById(options.id).then(res=>res);
    }
    if (options.search.title || options.search.tag){
      return this.peliculas.search(options.search);
    }
    if (options.search){
      return this.peliculas.getAll();
    }
  }
  add(peli:Peli){
    return this.peliculas.add(peli);
  }
}
export { PelisController };
