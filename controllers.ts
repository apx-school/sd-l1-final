import { PelisCollection, Peli } from "./models";

class PelisController {
  CollPelis : PelisCollection;
  constructor() {
    this.CollPelis = new PelisCollection();
  }

  /* get(options) recibe un objeto y, según cuales sean sus propiedades */

  get(options:any){
    if(options.id){
     return this.CollPelis.getById(options.id);
    } else if(options.search){
      if (options.search.title && options.search.tag){
       return this.CollPelis.search({
        title: options.search.title,
        tag: options.search.tag
       })
      } else if (options.search.title) {
        return this.CollPelis.search({title: options.search.title})
      } else if (options.search.tag){
        return this.CollPelis.search({tag: options.search.tag})
      } 
    } else {
      return this.CollPelis.getAll();
    }
  };

  add(peli:Peli){
    return this.CollPelis.add(peli);
  }
}
export { PelisController };

//funcionan test localmente