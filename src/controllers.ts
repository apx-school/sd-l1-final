import { promises } from "dns";
import { PelisCollection, Peli } from "./models";

type searchOptions = {
  title?: string;
  tag?: string
};

type getOptions= 
| { id : number}
| { search : searchOptions}
| undefined




class PelisController {
  private collection : PelisCollection;
  private pelis: Peli[]= []

  constructor() {
    this.collection = new PelisCollection()
  };

  async getAllPelis():Promise<Peli[]> {
    return this.collection.getAll();
  }

    async getOne(options? : {id: number }) {
      return this.collection.getById(options.id);  
    }
  
  
  
  async get(options?: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.collection.getById(options.id);
      return peli ? [peli] : [];
    }
  
    if (options?.search) {
      return await this.collection.search(options.search);
    }
  
    return await this.collection.getAll();
  }
  

  async add(peli: Peli): Promise<boolean> {
    return this.collection.add(peli);
  }
  
  async search(options : searchOptions): Promise <Peli[]>{
    return this.collection.search(options)
}}
//Si no se pasa nada (undefined), devuelve todo con getAll.
  
export { PelisController };
