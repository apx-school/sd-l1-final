import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  movies: PelisCollection;
  promesa: Peli[];

  constructor() {
    (async () => {
      this.movies = new  PelisCollection();
      const promesa = await this.movies.getAll()
      this.promesa = promesa;
      
  })();

    
  }
  async add(peli: Peli){
    const process = await this.movies.add(peli)
    if (process) {
      console.log("Se resolvio exitosamente")
    } else {
      console.log("Se resolvio desfavorablemente")
    }
  }

  async get(options?:Options){
    var resultado;
    if (options.id) {
      resultado = await this.movies.getById(options.id);
      return resultado;
    } else if(options.search){
      if (options.search.title && options.search.tag) {
        resultado = await this.movies.search(options.search)
        return resultado;
      }else if (options.search.title) {
        resultado = await this.movies.search(options.search)
        return resultado;
      } else if(options.search.tag){
        resultado = await this.movies.search(options.search)
        return resultado
      }
    } else {
      resultado = await this.movies.getAll()
      return resultado;
    }
  }
}
export { PelisController };
