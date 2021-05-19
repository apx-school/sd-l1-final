import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  promise:Promise<any>;
  constructor() {
    this.movies = new PelisCollection()
  }
  processOptions(options){
    if(options.get){
      return this.movies.getById(options.get);
    }else{
      return this.movies.getAll();      
    }
  }
}
export { PelisController };
