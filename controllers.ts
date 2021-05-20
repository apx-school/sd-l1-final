import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  promesa: Promise<any>;
  constructor() {
    this.data = new PelisCollection();

  }
  get(options:any): Promise<any> {
    if(options.id){
      return this.data.getById(options.id);
    } else
    if(options.search){
      return this.data.search(options.search);
    }else {
      return this.data.getAll();
    }
   
  }

  add(peli:Peli){
    return this.data.add(peli);
  }
}
export { PelisController };
