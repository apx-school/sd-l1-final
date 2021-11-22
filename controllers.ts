import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options: any): Promise<any> {
    try {
      if (options.id) {
        const peli = await this.pelis.getById(options.id);
        return peli;
      } else if (options.search) {
        const primerSearch = await this.pelis.search(options.search);
        return primerSearch;
      } else if (options.search) {
        const segundoSearch = await this.pelis.search(options.search);
        return segundoSearch;
      } else {
        const todasLasPelis = await this.pelis.getAll();
        return todasLasPelis;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async add(peli: Peli) {
    const nuevaPeli = await this.pelis.add(peli);
    return nuevaPeli;
  }
}

export { PelisController };
