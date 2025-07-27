import { PelisCollection, Peli } from "./models";

type SearchOptions = {
  title?: string;
  tag?: string;
}

type Options = {
    id?: number;
    search?: SearchOptions;
  }

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection()  
  }

async get(options?: Options): Promise<Peli[]> {
  //console.log("Opciones recibidas:", options);

  if(!options){
    return await this.model.getAll();
  }
  if(options.id){
    return  [await this.model.getById(options.id)];
  }

  if(options.search){

   // if(options.search.title || options.search.tag){
      return await this.model.search(options.search);
      console.log(this.model.search(options.search))
 // }
    }
    return [];
  }

  async getOne(options:Options): Promise<Peli>{
   const respuestaGet = await this.get(options);
   const primero = respuestaGet[0];
   return primero;
  }

  async add(peli: Peli){
    return await this.model.add(peli);
  }
    
  }


export { PelisController };