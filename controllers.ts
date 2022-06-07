import { title } from "process";
import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    new PelisCollection()
    this.pelisCollection = new PelisCollection();

  } 

  async get(options:any):Promise<any>{
    
    if(options.id != undefined){
      const id = options.id;
      return await this.pelisCollection.getById(id);
    }
    
    if(options.search){
      const search = options.search;
      const title = search.title;
      const tags = search.tag;

      if(title && tags){
        const x ={
          "title": title,
          "tags": tags
        };
        return await this.pelisCollection.search(x);
      }
      else if(title){
        const x = { "title": title };
        return await this.pelisCollection.search(x);
      } 
      else if(tags){ 
        const x = { "tags": tags };
        return await this.pelisCollection.search(x);
      }
      

    };
  };

  async add(peli:Peli){
    return await this.pelisCollection.add(peli);
  };

}
export { PelisController };

async function main(){
  const peliController = new PelisController();

  const searchParam = {};

  peliController.get(searchParam).then((obj) => { return obj });
  
}

main();
