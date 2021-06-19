import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccion: PelisCollection;
  constructor() {
    this.coleccion = new PelisCollection;
  }

  get(options?: any): Promise<any> {
    if (options.search) {
      return this.coleccion.search(options.search).then((p)=>{
        return p;
      })
    } else if (options._ == "id") {
      return this.coleccion.getById(options.id).then((p)=>{
        return p;
      })
    } else if (options.id) {
      return this.coleccion.getById(options.id).then((p)=>{
        return p;
      })
    } else 
    return this.coleccion.getAll().then((p)=>{
      return p;
    }) 
  }  

  add(peli: Peli) {
      this.coleccion.add(peli);
    }
  }

export { PelisController };
