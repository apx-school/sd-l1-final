import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
     this.pelisCollection = new PelisCollection;
  }

  get(options?: any): Promise<any> {
    if (!options) {
      return this.pelisCollection.getAll().then((p)=>{
        console.table(p);
        return p;
      });
    } 
      if (options.id) {  //FUNCIONA
        return this.pelisCollection.getById(options.id).then((p)=>{
          console.table(p);
          return p;
        });
      
      } else if (options.search.title) {  //FUNCIONA
        return this.pelisCollection.search(options.search).then((p)=>{
          return p;
        });
      } else if ( options.search.tag ) {  //FUNCIONA 
        return this.pelisCollection.search(options.search).then((p)=>{
          return p;
        });
      } else if ( options.search.title && options.search.tag ) {
        return this.pelisCollection.search(options);
      }
      
    }

add(peli:Peli) {
    return this.pelisCollection.add(peli);
  }
}

// const peliControler = new PelisController;
// // const peliEncontrada = peliControler.get ({id: 13});
// const peliEncontrada = peliControler.get({ search: { tag: "accion" } }).then((p)=>{
//   console.table(p); 
//   return p;
// })
// console.table(peliEncontrada);

export { PelisController };
