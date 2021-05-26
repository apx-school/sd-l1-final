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
    }if(options.title){
      return this.movies.search(options.title);
    }if(options.tags){
      return this.movies.search(options.tags);
    }else{
      return this.movies.getAll();      
    }
  }
}
export { PelisController };
