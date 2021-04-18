import { PelisCollection, Peli } from "./models";

export class PelisControllerOptions {
  action: "get" | "add";
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
  get(){
    this.pelis.getAll()
    this.pelis.getById()
    this.pelis.search()
  }

  add(algo){
    this.pelis.add(algo)
  }

  procesOptions(options: PelisControllerOptions) {
    let resultado;

    
}

export { PelisController };
