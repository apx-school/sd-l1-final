import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;  
  constructor() {
    this.peliculas = new PelisCollection();
  }
get(options:any){
    var resultado;
    console.log(this.peliculas);
console.log(options);
 if(options.search){
  return resultado = this.peliculas.search(options.search);
} else if(options.search){
  return resultado = this.peliculas.search(options.search.title);
} else if(options.search) {
  return resultado = (this.peliculas.search(options.search.tag));
} else if(options.get) {
  return resultado = this.peliculas.getById(options.get); 
  } else {
    return this.peliculas.getAll();
  }
}
add(peli:Peli){
    return this.peliculas.add(peli);
  }
}
export { PelisController };
 
const control = new PelisController();
  
  const objeto = new PelisController();
  objeto.peliculas.getAll().then((resultado) =>{
    console.log(resultado);
  });