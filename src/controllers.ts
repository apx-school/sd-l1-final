import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?:{
    title?:string;
    tag?: string;
  };
};

class PelisController {
  model:  PelisCollection;
  constructor() {
      this.model = new PelisCollection();
  };

  async get (options?: Options):Promise<Peli[]> {
   try { 
    if(options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : []
    }
    if (options?.search) {
      return await this.model.search(options.search);
    }
    return await this.model.getAll();
   } catch (error){
    console.error("Error al obtener la pelicula:", error);
    return [];  
   }
  }

  async getOne(options?: Options):Promise<Peli | null >  {
    const resultado = await this.get(options);
    return resultado[0] || null;
  }

  async add (pelis: Peli): Promise<boolean>{
    return await this.model.add(pelis)
  }

};

export { PelisController};
