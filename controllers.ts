import { PelisCollection, Peli } from "./models";
import * as vacio from "lodash/isEmpty"

class PelisControllerOptions {
  action: "get" | "add" | "search";
  params: Peli;
}

class PelisController {
  pelis: PelisCollection;
  promesa:Promise<any>;
  constructor() {
    this.pelis = new PelisCollection();
    let promesa = this.pelis.getAll();
    this.promesa = promesa
  }
  
  get(options:any){
    if(vacio(options)){

      let res = this.pelis.getAll() 
      return res

    }else if(options.id){

      let res = this.pelis.getById(options.id)
      return res

    }else if(options.search){

      let res = this.pelis.search(options.res)
      return res

    }
  }

  add(peli:any){
    this.pelis.add(peli)
  }

  procesOptions(options: PelisControllerOptions) {
    let resultado;

    
}

export{ PelisController,PelisControllerOptions };
