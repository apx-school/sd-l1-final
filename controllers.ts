import { PelisCollection, Peli } from "./models";

class PelisController {
  controller: PelisCollection;
  constructor() {
    this.controller = new PelisCollection();
  }
 async get (options): Promise<any>{
  if (options.id){
    return this.controller.getById(options.id)
  }
  else if (options.search){
    return this.controller.search(options.search)
  }
  else {
    return this.controller.getAll()
  }
}
  async add (peli): Promise<boolean>{
    return this.controller.add(peli)
  }
  
}


export { PelisController };
