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

  async get(options?: Options): Promise<any> {
    if (options?.id) {
        const peliId = await this.coleccionPelis.getById(options.id);
        if (!peliId) {
            throw new Error("Película no encontrada");
        }
        return peliId;
    } else if (options?.search) {
        const peliSearch = await this.coleccionPelis.search({
            title: options.search.title,
            tag: options.search.tag,
        });
        return peliSearch.length > 0 ? peliSearch : [];
    } else {
        return this.coleccionPelis.getAll();
    }
}

  
  async add(peli:Peli){
    const peliAdd = await this.coleccionPelis.add(peli);
    if (peliAdd){
      return peli;
    }
    
  }
}
export { PelisController };
