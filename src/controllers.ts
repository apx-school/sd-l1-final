import { promises } from "dns";
import { PelisCollection, Peli, SearchOptions } from "./models";

class PelisController {
  model:PelisCollection;

  constructor() {
    this.model= new PelisCollection();
  }
  async get(options?:Options):Promise<Peli[]>{
     if (options?.id) {
    
      const peli = await this.model.getById(options.id);
      return [peli]; 
    
    } else if (options?.search){
      return await this.model.search(options.search)

    }
    
    return await this.model.getAll();


  }
  async add(Peli:Peli):Promise<boolean>{
    return this.model.add(Peli);
  }

 
  async getOne(options:Options):Promise<Peli> {
    const result= await this.get(options);
    return result[0];
  }

}


type Options = {
  id?: number | undefined;
  search?:{
    title?:string,
    tag?:string
  };
};
export { PelisController,Options };
