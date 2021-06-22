import { rejects } from "node:assert";
import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  promise:Promise<any>;
  constructor() {
    this.movies = new PelisCollection()
  }

  commands (response):Promise<any>{
    if(response.command = 'get')
      return this.get(response.value);
    /*else if(response.command = 'add')
      return this.add(response.value);*/
    if(response.command = 'search')
      return this.search(response.value);
    return Promise.reject(new Error("Comando erroneo"));
  }
  
  get(options): Promise<Peli | Peli[]> {
    console.log("el options de get",options);
    if(options.id){
      return this.movies.getById(options.id);
    }
  }
  search(options):Promise<Peli|Peli[]>{
    console.log("el options de Search", options)
    if(options.title && options.tags){
      return this.movies.search(options);
    }else if(options.title){
      return this.movies.search(options);
    }else if(options.tags){
      return this.movies.search(options);
    }
  }
  /*add(movie): Promise<any> {
    return this.movies.add(movie)
  }*/
}
export { PelisController };
