import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model:PelisCollection;
  constructor() {    
    this.model = new PelisCollection();
  }
  async get(options?:Options):Promise<Peli[]>{
    if (options?.id != null) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }
    return [];
  }

  async getOne(options: Options): Promise<Peli | null> {
    const pelis = await this.get(options);
    return pelis.length > 0 ? pelis[0] : null;
  }

  async add(peli:Peli): Promise<void> 
  {
    /*const newPeli = { 
      id: 4421, 
      title: "Una peli", 
      tags: ["classic", "action"] 
    };*/
    try {
      await this.model.add(peli);
    } catch (error) {
      console.error("Error al agregar la película:", error);
      throw error; // Re-lanzar el error para que pueda manejarse en otros niveles
    }
  }
}
export { PelisController };
