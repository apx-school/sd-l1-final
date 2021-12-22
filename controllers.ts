import { PelisCollection, Peli } from "./models";


class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  
  get(options:any): Promise <any>{
    
    if (options.empty){

      return this.data.getAll().then((res)=> res);
    }
  
    if(options.id){
      return this.data.getById(options.id)
    } 
    
    if(options.search){
      
      if (options.search.title && options.search.tag){
        return this.data.search({
          title: options.search.title,
          tags: options.search.tag,
        });
        
      } else if(options.search.title){
        return this.data.search({
          title: options.search.title
        });
        
      } else if (options.search.tag){
        return this.data.search({
          tags: options.search.tag
        });
      } }
    }
    
    add(peli:Peli){
      return this.data.add(peli);
  }

}
export { PelisController };
 
