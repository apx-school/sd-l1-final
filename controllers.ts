import { PelisCollection, Peli } from "./models";

class PelisController {
  listaPelis: PelisCollection;
  promise: Promise<any>;
  constructor() {
    const listaPelis = new PelisCollection();
    this.listaPelis = listaPelis;
    const promise = listaPelis.getAll();
    this.promise = promise;
  }


  get(options): Promise<any>{
    
    if(options.id){
      return this.listaPelis.getById(options.id).then((result) =>{
        return result;
      });
    } else if( options.search){
      return  this.listaPelis.search(options.search).then((result) =>{
        return result;
      });
    } else{
      return this.listaPelis.getAll().then((result)=>{
        return result;
      });
    }
  }

  add(peli:Peli){
     
    return this.listaPelis.add(peli).then((resultado) =>{
      return resultado;
    })
  }

}
export { PelisController };
