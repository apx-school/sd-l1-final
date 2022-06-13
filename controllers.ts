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
      var search = options.search;
      // console.log("search que llega al controller ", search)
      var title = search.title;
      var tag = search.tag;

      if(title && tag){
        // console.log("Se llamo al controller por full search");
        const x ={
          "title": title,
          "tag": tag
        };
        return await this.pelisCollection.search(x);
      }
      else if(title){
        // console.log("Se llamo al controller por only title");
        const x = { "title": title };
        return await this.pelisCollection.search(x);
      } 
      else if(tag){ 
        // console.log("Se llamo al controller por only tag");
        const x = { "tag": tag };
        return await this.pelisCollection.search(x);
      }
    };

    if(options.option == undefined){
      return await this.pelisCollection.getAll();

      // console.log(listaPeliculas);
    }
  };

  async add(peli:Peli){
    return await this.pelisCollection.add(peli);
  };

};
export { PelisController };

async function main(){
  const peliController = new PelisController();

  const searchParam = {};

  peliController.get(searchParam).then((obj) => { return obj });
  
};

main();
