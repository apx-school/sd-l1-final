import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  async get(options: any) {
    var respuesta: any;
    if (options.id) {
      respuesta = await this.pelis.getById(options.id);
    } else if (options.search) {
      respuesta = await this.pelis.search(options.search);
    } else if (options.empty) {
      respuesta = await this.pelis.getAll();
    }
    return respuesta;
  }
  async add(peli: Peli): Promise<any> {
    const respuesta = await this.pelis.add(peli);
    return respuesta;
  }
}
export { PelisController };
