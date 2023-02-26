import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options: any): Promise<any> {
    let resultado: any;
    if (options.id) {
      resultado = await this.pelis.getById(options.id);
    } else if (options.search) {
      resultado = await this.pelis.search(options.search);
    } else if (options.empty) {
      resultado = await this.pelis.getAll();
    } else if (options.add) {
      resultado = await this.pelis.add(options.add);
    } else if (options.getAll) {
      resultado = await this.pelis.getAll();
    }
    return resultado;
  }

  add(peli: Peli): Promise<boolean> {
    return this.pelis.add(peli);
  }
}
export { PelisController };
