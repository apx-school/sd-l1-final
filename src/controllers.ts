import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};


class PelisController {
  model: any;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    let pelis = await this.model.getAll();
    
    if (!options) {
      return pelis;
    }
  
    if (options.id) {
      pelis = pelis.filter(peli => peli.id === options.id);
    }
  
    if (options.search) {
      if (options.search.title) {
        pelis = pelis.filter(peli => 
          peli.title.toLowerCase().includes(options.search.title.toLowerCase())
        );
      }
      
      if (options.search.tag) {
        pelis = pelis.filter(peli => {
          const lowerTags = peli.tags?.map(tag => tag.toLowerCase()) || [];
          return lowerTags.includes(options.search.tag.toLowerCase());
        });
      }
    }
  
    return pelis;
  }
  

  async getOne(options: Options): Promise<Peli> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  async add(peli: Peli): Promise<boolean> {
    const resultado = await this.model.add(peli);
    return resultado;
  }
  
}
export { PelisController };
