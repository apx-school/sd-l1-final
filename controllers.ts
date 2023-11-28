import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options?: Options): Promise<Peli|Peli[]> {
    if (options.id){
      return this.pelisCollection.getById(options.id);
    }
    if (options.search){
      return this.pelisCollection.search(options.search);
    }
    
  }
  add(peli: Peli): Promise<boolean> {
    const result = this.pelisCollection.add(peli);
    return result;
  }

}
export { PelisController };
