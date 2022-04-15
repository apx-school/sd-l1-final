import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection
  constructor() {
    this.peliculas = new PelisCollection();
  }
get(options:any): Promise<any>{
   //si el objeto tiene propiedad id
  if (options.id){ 
    return this.peliculas.getById(options.id).then((pelicula) => {
      return pelicula;
    });

  }  
  
  //si el objeto tiene propiedad search
  else if(options.search){
    const PeliEncontrada = this.peliculas.search(options.search).then((pelicula) => {
      return pelicula;
    });

    return PeliEncontrada;
  } 

  else{//no recibe parametro
    return this.peliculas.getAll().then((pelicula) => {
      return pelicula;
    }); 
  }

}

add(peli:Peli){
  return this.peliculas.add(peli)

}

}
export { PelisController };