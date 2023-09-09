import { PelisCollection, Peli, SearchOptions } from "./models";


type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

interface PeliControllerOptions {
  action?: "search" | "add";
  params?: Peli;
}

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.pelis = new PelisCollection;
    
  }
//Object.keys(): devuelve un arreglo de propiedades enumerables propias de un objeto dado.
  async get(options?: Options): Promise<any> {
    if (Object.keys(options).length == 0) {
      return await this.pelis.getAll();
    }

    if (options.id) {
      return await this.pelis.getById(options.id);
    }

    if (options.search) {
      return await this.pelis.search(options.search);
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelis.add(peli);
  }
  }

export { PelisController };

//const peliController = new PelisController();
 //peliController.pelis.getAll().then((res) => console.table(res));
 //peliController.get({id:2}).then((res) => console.table(res.title))
