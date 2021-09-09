import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options:any): Promise<any>{
    let resultado;
    if(options.id){
      return this.pelis.getById(options.id).then((i)=>{
        return i;
      })
    }else if(options.search){
      resultado = this.pelis.search(options.search).then((i)=>{
        return i;
      })
    }else{
      resultado = this.pelis.getAll().then((i)=>{
        return i;
      })
    }
    return resultado;
  }
  add(peli: Peli): Promise<boolean>{
    return this.pelis.add(peli).then((p)=>{
      return p;
    });
  }
}

export { PelisController };
