import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas:PelisCollection
  promesa: Promise<any>
  constructor() {
    this.peliculas = new PelisCollection()
    const promise = this.peliculas.getAll()
    this.promesa = promise
  };
  get(options: any): Promise<any>{
    if(options.id){
      //console.log(options.id)
      return this.peliculas.getById(options.id)
    }
    if(options.search){
      return this.peliculas.search(options.search)
    }
    else{
      return this.peliculas.getAll()
    }
  }
  add(peli:Peli){
    return this.peliculas.add(peli)
  }
}
export {PelisController};
