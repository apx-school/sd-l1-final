import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }
 async get(options?:Options):Promise<Peli[]>{
    let result: Peli[] = [];
    if (options.id){
      const peli = await this.model.getById(options.id);
      if (peli){
        result.push(peli);
      }
    } else if (options.search) {
     result = await this.model.search(options.search);
    } else {
      result = await this.model.getAll();
    }
    return result;
  }
  
  async getOne(options:Options):Promise <Peli | undefined>{
   const results = await this.get(options);
   return results[0];
   }

   add(peli:Peli){
    return this.model.add(peli);
   }
}
export { PelisController };
