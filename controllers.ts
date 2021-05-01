import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis:PelisCollection
  constructor() {
    this.pelis = new PelisCollection;
  }

  get(options:any){
    let resultado:Promise<any>
    if(options.id){
      resultado = this.pelis.getById(options.id);
    }else if(options.search){
      resultado = this.pelis.search(options.search);
    }else{ resultado = this.pelis.getAll().then((peliculas)=>{
      return peliculas
    })}

    return resultado;
  }
  
  add(peli:Peli){
    return this.pelis.add(peli);
  }
}
export { PelisController };
