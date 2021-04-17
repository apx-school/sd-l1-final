import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>
  constructor() {
    this.pelis = new PelisCollection();
    const promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  get(options){
    let resultado;
    if(options.hasOwnProperty("id")){
      resultado = this.pelis.getById(options.id).then((p =>{
        return p;
      }))
    }else if(options.hasOwnProperty("get")){
      resultado = this.pelis.getById(options.get).then((pr =>{
        
        return pr;
      }));
    }else if(options.hasOwnProperty("add")){
      resultado = this.add(options.add).then((r=>{
        return r;
      }))
    }else if(options.hasOwnProperty("search")){
      resultado = this.pelis.search(options.search).then((pr =>{
        return pr;
      }));
    }else{
      resultado = this.pelis.getAll().then((promesa =>{
        return promesa;
      }));
    }
    return resultado;
}
    add(peli){
      const peliculas = new Peli();
      peliculas.id = peli.id;
      peliculas.title = peli.title;
      peliculas.tags = peli.tags;  
      return this.pelis.add(peliculas);
    }
    }
  

export { PelisController };