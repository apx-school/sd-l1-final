import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  instanciaPelisCollection:PelisCollection
  constructor() {
    this.instanciaPelisCollection = new PelisCollection()
  }

  get =  async(options:Options):Promise<Peli[]> =>{
    const pelis = await this.instanciaPelisCollection.search()
    
  }










}
export { PelisController };
