import { PelisCollection, Peli } from "./models";

class PelisController {
  lasPelis: PelisCollection;
  constructor() {
    this.lasPelis = new PelisCollection();
  }
  get(options:any): Promise<any>{
    if(options.id){
      return this.lasPelis.getById(options.id).then((res)=>{
        return res;
      })
    }else if(options.search){
      const encontrado = this.lasPelis.search(options.search).then((res)=>{
        return res;
      })
      return encontrado;
    }else {  return this.lasPelis.getAll().then((res)=>{
      return res;
    })
  }}
  add(pelis:Peli){
    return this.lasPelis.add(pelis)
  }
}
export { PelisController };