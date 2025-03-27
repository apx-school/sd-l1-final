import { PelisCollection, Peli } from "./models";


type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

  class PelisController {
  model: PelisCollection
  constructor() {
    this.model = new PelisCollection()
  }
  
  async getAll(): Promise<Peli[]> {
    return this.model.getAll();
  }

  async get(options?: Options): Promise<Peli[]>{
    try {
    if(!options) {
      return await this.model.getAll();
    } else if(options.id){
      const result = await this.model.getById(options.id)
      return result ? [result] : [];
    } else if (options.search){
      return await this.model.search(options.search)
      
    }
      } catch (error) {
      console.log("Error al obtener las pelis", error)
      return []
    }
    
    
  }


  async getOne(options:Options):Promise<Peli>{
    const resultado = await this.get(options);
    return resultado[0];
  }

  async add(peli:Peli){
    return await this.model.add(peli);
  }
}
export { PelisController };
