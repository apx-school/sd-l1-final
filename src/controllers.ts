import { PelisCollection, Peli } from "./models";


type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  coleccionPelis:PelisCollection

  constructor() {
    this.coleccionPelis = new PelisCollection();
  }

  async get(options?: Options) : Promise<any> {
    if (options?.id) {
      return this.coleccionPelis.getById(options.id);
    } else if (options?.search) {
      return this.coleccionPelis.search({
        title: options.search.title,
        tag: options.search.tag,
      });
    } else {
      return this.coleccionPelis.getAll();
    }
  }
  
  add(peli:Peli){
    return this.coleccionPelis.add(peli);
  }
}
export { PelisController };
