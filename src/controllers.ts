import { PelisCollection, Peli } from "./models";

type Options = { id?: number; search?: { title?: string; tag?: string; }; };

class PelisController {
  collectionPeli: PelisCollection;

  constructor() {
    this.collectionPeli = new PelisCollection();
  }
  async get(options?: Options): Promise<Peli[]> {
    if (options) {
      if (options.id) {
        const peli = await this.collectionPeli.getById(options.id)
        return peli ? [peli] : [];
      }
      else if (options.search) {
        return this.collectionPeli.search(options.search);
      }
    } return this.collectionPeli.getAll();
  }
  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis.length > 0 ? pelis[0] : undefined;
  }
  async add(peli: Peli): Promise<boolean> {
    return this.collectionPeli.add(peli);
  }
}
export { PelisController, Peli };


