import { PelisCollection, Peli } from "./models";

class controllerOptions{
  action: "get" | "search"
  params: any
}

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.pelis = new PelisCollection();
  }
  processOptions(options: controllerOptions): Promise<any> {
    var resultado;
    if (options.action == "get" && options.params.id) {
      resultado = this.pelis.getById(options.params.id);
      } else if (options.action == "get") {
        resultado = this.pelis.getAll();
      }else if (options.action == "search" && options.params.title){
        this.pelis.search(options.params.title);
      }else if (options.action == "search" && options.params.tag){
        this.pelis.search(options.params.title);
      }
       
      return resultado;
  }
  add(peli:Peli){
    return this.pelis.add(peli);
  }
}
export { PelisController, controllerOptions };
