import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection
  constructor() {
    this.peliculas = new PelisCollection();
  }
get(options){
   //si el objeto tiene propiedad id
  if (options.id){ 
    return this.peliculas.getById(options.id);
  }  //si el objeto tiene propiedad search
  else if(options.search){
    return this.peliculas.search(options.search);
  } 
  else{//no recibe parametro
    return this.peliculas.getAll(); 
  }

}
add(peli:Peli){
  return this.peliculas.add(peli)

}

}
export { PelisController };
