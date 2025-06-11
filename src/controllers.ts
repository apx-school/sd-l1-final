import { promises } from "dns";
import { PelisCollection, Peli } from "./models";

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection;
  };

  async get(options?: {id?: number, search?: {title?: string, tag?: string}}): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    } else {
      return this.model.search(options?.search || {})
    }
  }

  async getOne(options: {id:number}): Promise<Peli | null> {
    const lista = await this.get();
    return lista.find(peli => peli.id === options.id) || null;
  }

 async add(peliData: { id: number; title: string; tag: string[] }): Promise<boolean> {
  const nuevaPeli: Peli = {
    id:peliData.id,
    title: peliData.title,
    tag: peliData.tag
  };

  return await this.model.add(nuevaPeli)
 };                
  
}
export { PelisController };
