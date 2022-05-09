import { PelisCollection, Peli } from "./models";


class PelisController {
  pelis: PelisCollection
  constructor() {
    this.pelis = new PelisCollection()
  }
  get(options):Promise<any>{
    if(options.id){
      return this.pelis.getById(options.id)
    }
    else if(options.search){
      return this.pelis.search(options.search)
    }
    else{
      return this.pelis.getAll()
    }
  }
  add(option:Peli):Promise<any>{
    return this.pelis.add(option)
  }
}
export { PelisController };