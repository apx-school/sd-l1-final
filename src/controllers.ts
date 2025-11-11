import { constrainedMemory, title } from "process";
import { PelisCollection, Peli } from "./models";
import { rmSync } from "fs";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  }
}

class PelisController {
  modeloInterno: PelisCollection
  constructor() {
    this.modeloInterno = new PelisCollection;
  }

  async get(options?:Options): Promise<Peli[]>{
    try{
      if(!options){
          return this.modeloInterno.getAll();
      }
      if(options.id){
        const peliID = await this.modeloInterno.getById(options.id);
        if(peliID == undefined){
          return []
        }
        return [peliID];
      }else{
        const resultadoDeBusqueda = options.search ? await this.modeloInterno.search(options.search) : [];

        if(options.search.title && options.search.tag){
          console.log("Busqueda por title y tags");
          return resultadoDeBusqueda; 
        }else if(options.search.title){
          console.log("Busqueda por title");
          return resultadoDeBusqueda; 
        }else if(options.search.tag){
          console.log("Busqueda por tag");
          return resultadoDeBusqueda; 
        }
      }

    }catch(err){
      console.log("Error en la busqueda: " + err);
      return []
    }
  }

  // Metodo que devuelve el primer resultado del metodo get
  async getOne(options:Options):Promise<Peli> {
    const result = await this.get(options);
    return result[0];
  }

  // Crea una nueva peli en vase al parametro y la agrega a pelis.json
  async add(peli: Peli){
    const nuevaPeli = new Peli(peli.id, peli.title, peli.tags)
    const result = await this.modeloInterno.add(nuevaPeli);
    return result
  }

}

export { PelisController, Options };
