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
  else {
    return await this.controller.getAll()
  }
}
async add (peli){
  return await this.controller.add(peli)
}
}


export { PelisController };
