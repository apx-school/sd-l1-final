import { PelisCollection, Peli } from "./models";

class PelisController {
   pelis: PelisCollection
  constructor() {
    this.pelis = new PelisCollection();
    
  }
  async get(option: any){
    
    if(option.id){
      return await this.pelis.getById(option.id)
    }
    else if(option.search){
      return await this.pelis.search(option.search)
    }
    else if(option.add){
      return await this.pelis.add(option.add)
    }
    else{
      return await this.pelis.getAll()
    } 
    
  } 
  
}
export { PelisController };
