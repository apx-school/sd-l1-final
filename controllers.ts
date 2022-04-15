import { runInThisContext } from "node:vm";
import { threadId } from "node:worker_threads";
import { PelisCollection, Peli } from "./models";


class PelisController {
  listaDePeliculas : PelisCollection;
  promesa : Promise<any>
  constructor(){
  this.listaDePeliculas = new PelisCollection()
  const promesa = this.listaDePeliculas.getAll();
  this.promesa = promesa
 };


  get(options):Promise<any>{
    let resultado;
    if(options.id){
      //console.log("options.id del controller",options.id)
      resultado = this.listaDePeliculas.getById(options.id)
    }
    if(options.search){
      //console.log("options.search controller",options.search)
      resultado = this.listaDePeliculas.search(options.search)
    }
    if(options.search){
      resultado = this.listaDePeliculas.search(options.search)
    } 
    return resultado.then((res)=>{return res})
    
  }

  add(peli:Peli){
    return this.listaDePeliculas.add(peli).then((res)=>{return res})
  };
}
export { PelisController };

  