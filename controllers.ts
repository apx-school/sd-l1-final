import { PelisCollection, Peli } from "./models";


type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

const collection = new PelisCollection()


class PelisController {
  constructor() {}

  async add(peli:Peli){
   return await collection.add(peli)
  }




  async get(options?:Options){
    if(!options){
      return await collection.search(options)
    }else if(options.id){
      return await collection.getById(options.id)
    }else if(options.search){
      if(options.search.title){
        return await collection.search(options.search)
      }else if(options.search.tag){
        return await collection.search(options.search)
      }
    }else{
      return await collection.getAll()
    }

  }

}


export { PelisController };
