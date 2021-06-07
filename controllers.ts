import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }

  get(options:any): Promise<any>{
    if (options.id) {
      const res = this.data.getById(options.id).then((d)=>{
        return d;
      })
      return res
    }else if(options.search){
      const res = this.data.search(options.search)
        return res;
    }else if(options[0] == null){
      const res = this.data.getAll().then((d)=>{
        return d;
    })
    return res
    }
  }
  add(peli: Peli) {
    return this.data.add(peli).then((result) => {
      return result;
    });
  }
}

export { PelisController };