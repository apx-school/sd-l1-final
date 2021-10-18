
import { PelisCollection, Peli } from "./models";

class PelisController {
  peli : PelisCollection;
  constructor() {
    this.peli = new PelisCollection()
  }
  get(options : any): Promise <any>{
    var resultado;
    if (options.id){
      resultado = this.peli.getById(options.id)
    } 
    else if (options.search){
      resultado = this.peli.search(options.search)
      }
      else {
        resultado = this.peli.getAll();
      }
      return resultado;
    }
    add (peli : Peli):Promise <boolean>{
      return this.peli.add(peli)
    }
  }
export { PelisController };
