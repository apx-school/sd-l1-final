import { type } from "os";
import {includes} from "lodash"
import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
    this.pelis.getAll()
  }
  async get(options?: Options) {  
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.search) {
    return this.pelis.search(options.search);
    }
  }
  async add(peli: Peli): Promise<any> {    
    return this.pelis.add(peli);
  }
}
export { PelisController, Options };



