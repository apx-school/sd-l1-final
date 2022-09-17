import { PelisCollection, Peli } from "./models";

class PelisController {
  static get(arg0: { id: any; }) {
    throw new Error("Method not implemented.");
  }
  static add(arg0: { id: any; title: any; tags: any; }) {
    throw new Error("Method not implemented.");
  }
movies: PelisCollection;

  constructor() {
    this.movies = new PelisCollection();
  }

async get(option: any){
  if (option.id){
    return await this.movies.getById(option.id);
  }else if(option.search){
    return await this.movies.search(option.search);
  } else if (option.all){
    return await this.movies.getAll();
  } else if (option.add){
    return await this.movies.add(option.add);
  }
}
async add(pelicula:any) {
  return await this.movies.add(pelicula)};



}
export { PelisController };
