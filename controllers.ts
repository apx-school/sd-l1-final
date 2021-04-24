import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa:Promise<any>
  constructor() {
    this.pelis = new PelisCollection();
   
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.pelis.getById(options.id);
    }
    if (options.search) {
      return this.pelis.search(options.search);
    } else {
      
      return this.pelis.getAll();
    }
    
  }

  add(peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
