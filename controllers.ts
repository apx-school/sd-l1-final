import { PelisCollection, Peli } from "./models";


class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;


  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options:any): Promise<any> {
    if (options.id) {
      return this.pelis.getById(options.id);//then((r) => r);
    } else if (options.search) {
      return this.pelis.search(options.search);//then((r) => r);
    } else {
      return this.pelis.getAll().then((p)=>p);
    }
  }


  add(peli:Peli){
    return this.pelis.add(peli).then((result)=>{return result});
  }
}
export { PelisController };
