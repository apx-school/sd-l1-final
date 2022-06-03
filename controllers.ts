import { title } from "process";
import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    new PelisCollection()
    this.pelisCollection = new PelisCollection();

  } 

  async get(options:any):Promise<any>{
    const id = options.id;
    const search = options.search;

    if(id != undefined){
      return await this.pelisCollection.getById(id);
    }
    
    if(search != undefined){
      const titleToSearch = search.title;
      const tagsToSearch = search.tags;

      if(titleToSearch != undefined && tagsToSearch != undefined){
        const a = {
          title: titleToSearch,
          tags: tagsToSearch
        }

        return await this.pelisCollection.search(a);
      } else if (titleToSearch != undefined){
        const a = { title: titleToSearch }
        
        return await this.pelisCollection.search(a);
      } else {
        const a = { tags: tagsToSearch }

        return await this.pelisCollection.search(a);
      }
    }

    if(options == undefined || options == null){
      return await this.pelisCollection.getAll();
    }

  
  };

  async add(peli:Peli){
    return await this.pelisCollection.add(peli);
  }

}
export { PelisController };
