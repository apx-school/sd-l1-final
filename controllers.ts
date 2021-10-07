import { PelisCollection, Peli } from "./models";

class PelisController {
  coll:PelisCollection
  constructor(){
    this.coll = new PelisCollection
  }
  get(options){
    if(options.id){
      return this.coll.getById(options.id)
    }else if(options.search){
      return this.coll.search(options.search)
    }else if(options[0]=="all") {
      return this.coll.getAll()
    }
  }
  add(peli:Peli){
    return this.coll.add(peli)
  }


}
export { PelisController };
