import { PelisCollection, Peli } from "./models";

export type Options = {
  action?: "search" | "add" | "get" | "todos";
  id?: number;
  search?:
    | undefined
    | {
        title?: string;
        tag?: string;
      };
  peli?: Peli;
};

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    let resultado: Peli[] = [];
    try {
      if (options.id) {
        const peli = await this.model.getById(options.id);
        resultado.push(peli);
      } else if (options.action == "todos") {
        const todas = await this.model.getAll();
        resultado = todas;
      } else if (options.search) {
        const conTitle = await this.model.search(options.search);
        resultado = conTitle;
      }
    } catch (error) {
      throw new Error("Error al buscar la pelicula");
    }
    return resultado;
  }
  async getOne(options: Options): Promise<Peli> {
    return await this.get(options).then((result) => {
      return result[0];
    });
  }
  async add(peli: Peli) {
    await this.model.add(peli).then((result) => {
      return result;
    }).catch((error)=>{
      throw new Error("error" + error);      
    })
  }
}

const controlador = new PelisController();

export { PelisController };
