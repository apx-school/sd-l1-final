import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccion: PelisCollection;
  constructor() {
    this.coleccion = new PelisCollection();
  }
  async get(option: any) {
    var resultado: any;
    if (option.id) {
      resultado = await this.coleccion.getById(option.id);
    } else if (option.search) {
      resultado = await this.coleccion.search(option.search);
    } else if (option.add) {
      resultado = await this.coleccion.add(option.add);
    } else if (option.getAll) {
      resultado = await this.coleccion.getAll();
    }
    return resultado;
  }
  async add(peli: Peli) {
    return await this.coleccion.add(peli);
  }
}
export { PelisController };
