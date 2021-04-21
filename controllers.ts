import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  promesa: Promise<any>;
  constructor() {
    this.data = new PelisCollection();
    const promesa = this.data.getAll();
    this.promesa = promesa;
  }
  processOptions(option) {
    let resultado;
    resultado = this.data;
    return resultado;
  }
  get(options: any) {
    return this.data.getAll();
  }
}
export { PelisController };
