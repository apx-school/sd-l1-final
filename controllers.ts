import { PelisCollection, Peli } from "./models";
//TODO fijarse que se agregen pelis de consola al json correctamente
class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get({ id, search }: any): Promise<any> {
    if (id) {
      const peli: Peli = await this.pelisCollection.getById(id);
      return peli;
    }

    if (search) {
      return await this.pelisCollection.search(search);
    }

    if (!id && !search) {
      return await this.pelisCollection.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelisCollection.add(peli);
  }
}
export { PelisController };
