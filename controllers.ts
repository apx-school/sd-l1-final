import { PelisCollection, Peli } from "./models";

class PelisController {
  internalProperty: PelisCollection;
  constructor() {
    this.internalProperty = new PelisCollection();
  }
  get(options?:any){
    if(options == undefined){
      return this.internalProperty.getAll( );
    }else if(options.search){
      return this.internalProperty.search( options.search );
    }else{
      return this.internalProperty.getById( options.id );
    }
  }
  add(pelicula:Peli){
    return this.internalProperty.add(pelicula);
  }
  
}

export { PelisController };