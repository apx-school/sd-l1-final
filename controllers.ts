import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection;
  };

  get(options: any): Promise<any> {
    if (options.id) {
      return this.data.getById(options.id).then((r)=>{
       return r; 
      }); 
    }

   else if (options.search) {
      return this.data.search(options.search).then((r)=>{
        return r;
      });
    } else {
      return this.data.getAll().then((r)=>{
          return r;
      });
    }
  

  }

  add(peli: Peli): Promise<any>{
    return this.data.add(peli);
  }

}
export { PelisController };
