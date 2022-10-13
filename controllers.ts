import { PelisCollection, Peli } from "./models";

class PelisController {
  promesa: PelisCollection;
  constructor() {
    this.promesa = new PelisCollection();

  }

  async get(options: any): Promise<any>{
      if(options.id){
        return await this.promesa.getById(options.id)
      }
      if(options.search){
        return await this.promesa.search(options.search)
      }
      if(options.falso){
        return await this.promesa.getAll()
      }
  }

  add(peli:Peli): Promise<boolean>{
    return this.promesa.add(peli);
  }
}

export { PelisController };