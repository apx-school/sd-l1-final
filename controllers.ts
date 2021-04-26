import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  promesa: Promise<any>;
  constructor() {
    this.data = new PelisCollection();
    const promesa = this.data.getAll();
    this.promesa = promesa;
  }
  get(objetoInput: any) {
    let resultado;

    if (
      objetoInput.hasOwnProperty("id") &&
      objetoInput.hasOwnProperty("title") &&
      objetoInput.hasOwnProperty("tags")
    ) {
      resultado = this.add(objetoInput).then((res) => {
        return res;
      });
    } else if (
      objetoInput.hasOwnProperty("title") ||
      objetoInput.hasOwnProperty("tags")
    ) {
      resultado = this.data.search(objetoInput).then((res) => {
        return res;
      });
    } else if (objetoInput.hasOwnProperty("id")) {
      resultado = this.data.getById(objetoInput.id).then((res) => {
        return res;
      });
    } else
      resultado = this.data.getAll().then((res) => {
        return res;
      });

    return resultado;
  }
  add(objetoInput: any) {
    return this.data.add(objetoInput);
  }
}
export { PelisController };
