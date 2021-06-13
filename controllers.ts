import { OPENSSL_VERSION_NUMBER } from "node:constants";
import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
     this.pelisCollection = new PelisCollection;
  }

  
  get(options?: any): Promise<any> {
    if (options._ == 'search') {
      const peliEncontrada = this.pelisCollection.search(options).then((p)=>{
        return p;
      })
      return peliEncontrada;
    } else if (options._[0] == 'get') {
      const objId = {id: options._[1] }
      return this.pelisCollection.getById(objId).then((p)=>{
        return p;
      })
    } else return this.pelisCollection.getAll().then((p)=>{
      return p;
    }) 
  }  

            
  

add(peli:Peli) {
    return this.pelisCollection.add(peli);
  }
}




export { PelisController };
