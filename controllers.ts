import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  
  get(options:any){
    if(options.id){
      return this.data.getById(options.id)
    } else if (options.search.title && options.search.tags){
      return this.data.search({
        title: options.search.title,
        tags: options.search.tags,
      });
    } else if(options.search.title){
      return this.data.search({
        title: options.search.title
      });
    } else if (options.search.tags){
      return this.data.search({
        tags: options.search.tags
      });
    }else{
      return this.data.getAll().then((res)=>{console.log(res)});
    }
  }
  
  add(peli:Peli){
    return this.data.add(peli);
  }

}
export { PelisController };
