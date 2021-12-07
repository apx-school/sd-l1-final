import { PelisCollection, Peli } from "./models";

// interface Options {
//     id?: number,
//     search?: {
//       title?: string,
//       tag?:string
//     }
// }

class PelisController {
  coleccionPelis : PelisCollection;

  constructor() {
    this.coleccionPelis = new PelisCollection();
  }

  //get(options) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
  get(options:any){
    if(options.id){
     return this.coleccionPelis.getById(options.id);
    } else if(options.search){
      if (options.search.title && options.search.tag){
       return this.coleccionPelis.search({
        title: options.search.title,
        tag: options.search.tag
       })
      } else if (options.search.title) {
        return this.coleccionPelis.search({title: options.search.title})
      } else if (options.search.tag){
        return this.coleccionPelis.search({tag: options.search.tag})
      } 
    } else {
      return this.coleccionPelis.getAll();
    }
  };

  add(peli:Peli){
    return this.coleccionPelis.add(peli);
  }
}


export { PelisController };
