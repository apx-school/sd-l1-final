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
      
      } else if (options.search.title) {
        return this.pelisCollection.search(options.search.title).then((p)=>{
          console.table(p);
          return p;
        });
      } else if ( options.search.tag ) {
        return this.pelisCollection.search(options.search.tag). then((p)=>{
          console.table(p);
          return p;
        });
      } else if ( options.search.title && options.search.tag ) {
        return this.pelisCollection.search(options.search.title).then((p)=>{
          console.table(p);
          return p;
        }) && this.pelisCollection.search(options.search.tag).then((p)=>{
          console.table (p);
          return p;
        })
      }
      
    }
    
   
       
  

  add(peli:Peli) {
    return this.pelisCollection.add(peli);
  }
}

const peliControler = new PelisController;
// const peliEncontrada = peliControler.get ({id: 13});
const peliEncontrada = peliControler.get({ search: { title: "Mi" } })
console.table(peliEncontrada);

export { PelisController };
