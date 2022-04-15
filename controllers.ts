import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection
  promesa:Promise<any>
  constructor() {
    const pelis = new PelisCollection()
    this.pelis = pelis
    const promesa = this.pelis.getAll()
    this.promesa = promesa
  }
  //invoca a los metodos del models segun las propiedades del options que recibe desde el index:
  //si options.id busca una peli por su id
  //si options.search busca peliculas segun las keys de search (pueden ser title y tag)
  //si options no tiene keys devuelve todas las peliculas
  get(options:any){
    if (options.id) {
      return this.pelis.getById(options.id)
    }
    if(options.search){
      return this.pelis.search(options.search)
    }else{
      return this.pelis.getAll()
    }
  }

  add(peli:Peli){
    return this.pelis.add(peli)
  }

}
export { PelisController };
