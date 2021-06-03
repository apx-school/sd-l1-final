import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas:PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();

  }
  get(options:any){ 
  if (options.id){ 
     return this.peliculas.getById(options.id); 
  } else if( options.search){
    return this.peliculas.search(options.search); 
   }
  else {
     this.peliculas.getAll(); 
  }
  }
  add(peli: Peli){ 
   this.peliculas.add(peli);
  }
}
export { PelisController };
