import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection
  constructor(){
    this.peliculas = new PelisCollection
  }
  async get(options){
    if (options.id){
      return await this.peliculas.getById(options.id)
    }
    if (options.search){
      return await this.peliculas.search(options.search)
    }
    if (options.nada){
      return await this.peliculas.getAll()
    }
  }
  async add(peli:Peli){
    await this.peliculas.add(peli)
  }

 /*  peliculas: PelisCollection
  promesa: Promise <any>
  constructor() {
    this.peliculas = new PelisCollection();
    const promesa = this.peliculas.getAll();
    this.promesa = promesa
  }
  processOptions(options: PelisControllerOptions){
    var resultado;
    if (options.params.id){
      resultado = this.peliculas.getById(options.params.id);
    } else if (options.action == "add"){
      resultado = this.peliculas.add(options.action)
    }
  } */

}
export { PelisController };
