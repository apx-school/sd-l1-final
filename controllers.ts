import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  promesa: Promise<any>;
  constructor() {
    this.data = new PelisCollection();
    const promesa = this.data.getAll();
    this.promesa = promesa;
  }
  get(options: any) {
    let resultado;

    resultado = this.data.getAll().then((res) => {
      return res;
    });

    return resultado;
  }
}
export { PelisController };
