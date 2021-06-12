import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
     this.pelisCollection = new PelisCollection;
  }

  get(options?: any): Promise<any> {
    if (options == null) {
      return this.pelisCollection.getAll().then((p)=>{
        console.table(p);
        return p;
      });
    } else if ( options.title && options.tag ) {
      console.log("Aca en el metodo get los params llegan asi:",options )
      return this.pelisCollection.search(options).then((p)=>{
        return p;
      });
    } else if (options.id) {  //FUNCIONA
        return this.pelisCollection.getById(options.id).then((p)=>{
          console.table(p);
          return p;
        });
      
      } else if (options.title) {  //FUNCIONA
        return this.pelisCollection.search(options).then((p)=>{
          return p;
        });
      } else if ( options.tag ) {  //FUNCIONA 
        return this.pelisCollection.search(options).then((p)=>{
          return p;
        });
      } 
    }

add(peli:Peli) {
    return this.pelisCollection.add(peli);
  }
}


export { PelisController };
