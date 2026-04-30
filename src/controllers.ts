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
  async get(options? :Options):Promise<Peli[]> {
    if (options?.id !== undefined) {
    const peli = await this.model.getById(options.id);
    return peli ? [peli] : [];
  }
  if (options?.search) {
    const results = await this.model.search(options.search);
    return results;
  }
  return await this.model.getAll();
  }
  async getOne(options: { id: number }): Promise<Peli | undefined > {
    return this.model.getById(options.id);
  }
  async add(peli:Peli): Promise<boolean>{
    return this.model.add(peli);
  }

}
export { PelisController }