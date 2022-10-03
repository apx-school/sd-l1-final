import { title } from "process";
import { PelisCollection, Peli } from "./models";

class PelisController {
  controller: PelisCollection
  constructor() {
    this.controller = new PelisCollection
  }
 get (options){
  if (options.id){
    return this.controller.getById(options.id)
  }
  if (options.add){
    return this.controller.add(options.add)
  }
  if (options.search){
    return this.controller.search(options.search)
  }
  else {
    return this.controller.getAll()
  }
}}

export { PelisController };
