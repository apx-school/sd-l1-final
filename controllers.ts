import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;  
  constructor() {
    this.peliculas = new PelisCollection();
  }
get(options): Promise<any>{
if(options.id){
  return this.peliculas.getById(options.id);
} else if(options.search){
  return this.peliculas.search(options.search);
} 
return this.peliculas.getAll();
}
add(peli:Peli){
  return this.peliculas.add(peli);
}
}

export { PelisController};


const control = new PelisController();
  
  const objeto = new PelisController();
  objeto.peliculas.getAll().then((resultado) =>{
    console.log(resultado);
  });