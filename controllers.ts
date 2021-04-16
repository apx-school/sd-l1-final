import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccionDePelis: PelisCollection;
  promesaController: Promise<any>;
  constructor() {
    this.coleccionDePelis = new PelisCollection();
    const promesa = this.coleccionDePelis.getAll();
    this.promesaController = promesa;
  }

  get(option:any) {
    let resultado: Promise<any>;
    if (option.hasOwnProperty("add")) {
      resultado = this.add(option.add);
    } else if (option.hasOwnProperty("search")) {
      resultado = this.coleccionDePelis.search(option.search).then((n) => {
        return n;
      });
    } else if (option.hasOwnProperty("id")) {
      resultado = this.coleccionDePelis.getById(option.id).then((n) => {
        return n;
      });
    } else if (option.hasOwnProperty("get")) {
      resultado = this.coleccionDePelis.getById(option.get).then((n) => {
        return n;
      });
    } else {
      resultado = this.coleccionDePelis.getAll().then((n) => {
        return n;
      });
    }

    return resultado;
  }
  add(objeto: Peli) {
    let peli = new Peli();
    peli.id = objeto.id;
    peli.title = objeto.title;
    peli.tags = objeto.tags;
    let promesaAdd = this.coleccionDePelis.add(peli);
    return promesaAdd;
  }
}
export { PelisController };
