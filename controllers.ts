import { PelisCollection, Peli } from "./models";


class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  
  get(options:any): Promise <any>{
    
    if (options.empty){

      return this.data.getAll();
    }
  
    if(options.id){
      return this.data.getById(options.id);
    } 
    
    if(options.search){
      console.log("entro en search")
      return this.data.search(options.search);
     } 
    }
    
  
    add(peli:Peli):Promise<boolean>{
      return this.data.add(peli);
  }

}
export { PelisController };
 
