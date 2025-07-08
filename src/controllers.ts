import { PelisCollection, Peli, SearchOptions } from './models';

class PelisController {
  private model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: { id?: number; search?: SearchOptions }): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    } else if (options?.search) {
      return this.model.search(options.search);
    } else {
      return this.model.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli); // Llama al método add del modelo
  }
}



export { PelisController,Peli};
