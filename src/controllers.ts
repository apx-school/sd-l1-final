import { constrainedMemory } from "process";
import { PelisCollection, Peli } from "./models";

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
    if(options.id){
      // "Devolvemos por id"
      const peliID = await this.modeloInterno.getById(options.id);
      return [peliID];

    }else if(options.search.title && options.search.tag){
      const peliTitleTag = await this.modeloInterno.search(options.search)
      return peliTitleTag;
    }else if(options.search.title){
      console.log("Devolvemos por title");
    }else if(options.search.tag){
      console.log("Devolvemos por tags");
    }else{
      console.log("No hay propiedades")
    }
    
    
    return ;
  }

}

const controller = new PelisController()
const opciones: Options = {
  search: {
    title: "spiderman",
    tag: "a"
  }
};
controller.get(opciones).then((P)=>{
  console.log(P)
})

export { PelisController };
