import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas:PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(options){
    if(options.id){
      return this.peliculas.getById(options.id)
    }else if(options.search){
      if(options.search){//listo
        return this.peliculas.search(options.search);
        //debe buscar las pelis que tengan ese string en el título. (ej: { search:{ title:"ju" } });(metodo llamado desde models)
      }
    }else{
      return this.peliculas.getAll();
    }
    return
  }
  add(peli:Peli){
    return this.peliculas.add(peli)
    //recibe un objeto y crea una peli en base a él. (Ej.: { id:4421, title:"Una peli", tags:["classic","action"] })
  }
}
export { PelisController };