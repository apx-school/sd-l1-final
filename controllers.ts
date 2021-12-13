import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  get(option?: any) {
    var result;
    if (option == undefined) {          
      return result = this.collection.getAll();      
    }
    if (option.id) {
      
      result = this.collection.getById(option.id);
      

    } else if (option.search.title && option.search.tags) {
            
      return this.collection.search({tags:option.search.tags}).then((res)=>{
        const respuesta = res.filter((peli)=>{
          return peli.title.includes(option.search.title)
        })
        return respuesta
      })
    } else if (option.search.title) {
      result = this.collection.search(option.search);
    } else if (option.search.tags) {
      result = this.collection.search(option.search);
    } 
    return result;
  }

  add(peli:Peli){
    return this.collection.add(peli);
  }

}

export { PelisController };

/* const prueba = new PelisController();
prueba.get({id:4}).then((res)=>{console.log(res)}) 
 */