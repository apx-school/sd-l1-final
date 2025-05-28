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

  async get(options: Options = {}): Promise<Peli[]> {
    try {
      await this.model.load();

      if (options.id) {
        const peliId = await this.model.getById(options.id);
        return peliId ? [peliId] : [];
      }

      if (options.search) {
        return await this.model.search(options.search);
      }

      return await this.model.getAll();
    } catch (error) {
      console.error("Error in get method:", error);
      throw error;
    }
  }

  async getOne(options: Options = {}): Promise<Peli | undefined> {
    try {
      const result = await this.get(options);
      return result[0];
    } catch (error) {
      console.error("Error in getOne method:", error);
      throw error;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      return await this.model.add(peli);
    } catch (error) {
      console.error("Error in add method:", error);
      throw error;
    }
  }
}

export { PelisController, Options };