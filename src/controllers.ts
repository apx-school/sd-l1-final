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
    try {
      const allPelis = await this.model.getAll();
      
      
      if (!options) {
        return allPelis;
      }
      
      if (options.id) {
        const peli = allPelis.find(p => p.id === options.id);
        return peli ? [peli] : [];
      }
      
      if (options.search) {
        let filtered = [...allPelis];
        
        if (options.search.title) {
          const titleSearch = options.search.title.toLowerCase();
          filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(titleSearch)
          );
        }
        
        if (options.search.tag) {
          const tagSearch = options.search.tag.toLowerCase();
          filtered = filtered.filter(p => 
            p.tags.some(t => t.toLowerCase() === tagSearch)
          );
        }
        
        return filtered;
      }
      
      return allPelis;
    } catch (e) {
      console.error("Error in get:", e);
      return [];
    }
  }
  
  async getOne(options: Options): Promise<Peli | null> {
    try {
      const results = await this.get(options);
      return results.length > 0 ? results[0] : null;
    } catch (e) {
      console.error("Error in getOne:", e);
      return null;
    }
  }
  
  async add(peli: Peli): Promise<boolean> {
    try {
      return await this.model.add(peli);
    } catch (e) {
      console.error("Error adding peli:", e);
      return false;
    }
  }
}

export { PelisController };