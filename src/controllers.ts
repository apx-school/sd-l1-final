import { rejects } from "node:assert";
import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  promise:Promise<any>;
  constructor() {
    this.movies = new PelisCollection()
  }

  commands (Response):Promise<any>{
    if(Response.command = 'get')
      return this.get(Response.value);
    if(Response.command = 'add')
      return this.add(Response.value);
    if(Response.command = 'search')
      return this.get(Response.value);
    return Promise.reject(new Error("Comando erroneo"));
  }
  
  get(options): Promise<Peli | Peli[]> {
    if(options.get){
      return this.movies.getById(options.get);
    }else if(options.title && options.tags){
      return this.movies.search(options);
    }else if(options.title){
      return this.movies.search(options);
    }else if(options.tags){
      return this.movies.search(options);
    }else{
      return this.movies.getAll();      
    }
  }
  add(movie) {
    return this.movies.add(movie)
  }
}
export { PelisController };
