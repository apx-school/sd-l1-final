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
async get(options?: Options): Promise<Peli[]> {
  let pelis = await this.model.getAll()
  if (!options) return pelis
  if (options.id) {
    pelis = pelis.filter(p => p.id === options.id)
  }
  if (options.search?.title) {
    pelis = pelis.filter(p => p.title.includes(options.search.title!))
  }
  if (options.search?.tag) {
    pelis = pelis.filter(p => p.tags.includes(options.search.tag!))
  }
  return pelis
}

  
  async getOne(options:Options):Promise <Peli | undefined>{
   const results = await this.get(options);
   return results[0];
   }

   add(peli:Peli){
    return this.model.add(peli);
   }
}
export { PelisController };
