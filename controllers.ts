import { PelisCollection, Peli } from "./models";

type options = {
  id?:number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options?: options): Promise<any> {

    if (Object.keys(options).length == 0) {
      return await this.pelis.getAll();
    }
    if (options.id) {
      return await this.pelis.getbyId(options.id);
    }
    if (options.search) {
      return await this.pelis.search(options.search);
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.pelis.add(peli);
  } 
}
export { PelisController };
