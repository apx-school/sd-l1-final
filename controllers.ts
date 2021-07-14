import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;  
  constructor() {
    this.peliculas = new PelisCollection();
  }
get(options){
    var resultado;
console.log(options);
if(options.search){
    return resultado = this.peliculas.search(options.title);
}else if(options.search){
  return resultado = this.peliculas.search(options.tag);
} else if(options.id){
    return resultado = this.peliculas.getById(options.id);
} else {
    return this.peliculas.getAll();
  }
}
add(peli:Peli){
    console.log(this.peliculas.add(peli));
  }
}
  
export { PelisController };
 
const control = new PelisController;
  
  const objeto = new PelisController();
  objeto.peliculas.getAll().then((resultado) =>{
    console.log(resultado);
  });