import { PelisCollection, Peli } from "./models";

class PelisController {
  controller: PelisCollection;
  constructor() {
    this.controller = new PelisCollection();
  }
 async get (options){
  if (options.id){
    return await this.controller.getById(options.id)
  }
  else if (options.search){
    return await this.controller.search(options.search)
  }
  else if (options.add){
    return await this.controller.add(options.add)
  }
  else {
    return await this.controller.getAll()
  }
}

}


export { PelisController };
