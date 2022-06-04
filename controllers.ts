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
    }else{
      // console.log("Options void", options);
      // console.log("SE LLAMO A GET ALL DESDE CONTROLLER");
      const peliList = await this.pelisCollection.getAll();
       
      // console.log(peliList);
      return peliList
    }

  
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
