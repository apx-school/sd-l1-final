import { OPENSSL_VERSION_NUMBER } from "node:constants";
import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
     this.pelisCollection = new PelisCollection;
  }

  
  get(options?: any): Promise<any> {
    if (options.search) {
      const peliEncontrada = this.pelisCollection.search(options.search).then((p)=>{
        return p;
      })
      return peliEncontrada;
    } else if (options._[0] == 'get') {
      return this.pelisCollection.getById(options._[1]).then((p)=>{
        return p;
      })
    } else if (options.id) {
      return this.pelisCollection.getById(options.id).then((p)=>{
        console.table(p)
        return p;
      })
    }
    else return this.pelisCollection.getAll().then((p)=>{
      return p;
    }) 
  }  

            
  

add(peli:Peli) {
    return this.pelisCollection.add(peli);
  }
}

export { PelisController };
