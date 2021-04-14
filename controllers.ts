import { PelisCollection, Peli } from "./models";

export class PelisControllerOptions {
  action: "get" | "add" | "search" | "";
  params: any;
}

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.pelis = new PelisCollection();
    const promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  procesOptions(options: PelisControllerOptions) {
    let resultado;

    if (options.action == "") {
      let palabra = "hola";
      return palabra;
    } else if (options.action == "get") {
      return true;
    } else if (options.action == "add") {
      return true;
    } else if (options.action == "search") {
      return true;
    }
  }
}

export { PelisController };
