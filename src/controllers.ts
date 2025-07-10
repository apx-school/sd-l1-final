import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }
  async get(options?:Options):Promise<Peli[]> {
    if(!options) {
      //sin opciones, devolvemos todas las pelis
      return await this.model.getAll();
    }
    // Si nos pasan un id, devolvemos la peli con ese id
    if(typeof options.id === "number") {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }
    // Si nos pasan opciones de búsqueda, devolvemos las pelis que coincidan
    if(options.search) {
      return await this.model.search(options.search);
    }
    return [];
  }
  async getOne(options:Options):Promise<Peli | undefined> {
    return (await this.get(options))[0];
  }
  async add(peli: Peli): Promise<boolean> {
  return await this.model.add(peli); 
}

}
export { PelisController };
