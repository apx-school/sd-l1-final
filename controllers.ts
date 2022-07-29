import { PelisCollection, Peli } from "./models";

class PelisController {
  colection: PelisCollection;
  constructor() {
    this.colection = new PelisCollection();

  }
async get (option:any) {
    
    if (option.id) {
  return await this.colection.getById(option.id);
    } else if (option.search) {
  return await this.colection.search(option.search);     
    }else if (option.add) {
      return await this.colection.add(option.add);
  }else if (option.getAll) {
    return await this.colection.getAll();
}
}
}

export { PelisController };
