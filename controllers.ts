import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection

  constructor() {
    this.pelis = new PelisCollection
    
  }
  get(options:any):Promise<any> {
    
    if(options.id){
      return this.pelis.getById(options.id).then((result)=>{return result});
    } 
    if(options.search){
      return this.pelis.search(options.search).then((result)=>{return result});
    }else {
      return this.pelis.getAll().then((result)=>{return result});
    }
    
  }
  add(peli:Peli){
      return this.pelis.add(peli).then((result)=>{return result});
    }
}


export { PelisController };
