import { PelisCollection, Peli } from "./models";

class PelisController {
  colection: PelisCollection
  promesa: Promise<any>
  constructor() {
    this.colection = new PelisCollection 
  }

  get(options):any{
    if(options.id){
      return this.colection.getById(options.id)
    } else if(options.search){
      return this.colection.search(options.search)
    } else {
      return this.colection.getAll()
    }

  }

  add(peli:Peli){
    return this.colection.add(peli)
  };

}

export { PelisController };



