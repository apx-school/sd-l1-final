import { PelisCollection, Peli } from "./models";
import * as jsonfile from 'jsonfile';

class PelisController {
  pelisCollection:PelisCollection
  constructor() {
    this.pelisCollection = new PelisCollection()
  }

  async get(options : any) : Promise<any>{
    if(options.id){
      return await this.pelisCollection.getById(options.id)
    }else if(options.search){
    return await this.pelisCollection.search(options.search)
   }else{
    return await this.pelisCollection.getAll()
   }
   
  }
  async add(peli:Peli){
    return this.pelisCollection.add(peli)
  }
}
export { PelisController };
