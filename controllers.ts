import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection;
  }
  async get(options:any){
     if(options.id){
      return await this.peliculas.getById(options.id);
     }else if(options.search){
      return await this.peliculas.search(options.search);
     }else if(options.add){
      return await this.peliculas.add(options.add)
     }else if(options.all){
      return await this.peliculas.getAll();
     }
  }
}
export { PelisController };
