import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }
  async get(options?: Options): Promise<Peli[]> {
    let resultado = [];
    if (!options || Object.keys(options).length == 0) {
      //Si options llega vacío, devuelve el listado completo
      resultado = await this.model.getAll();
    } else {
      //Options no llega vacío, analizo su contenido
      if (options.id) {
        //Si options tiene id busco por id
        const encontrado = await this.model.getById(options.id);
        if (encontrado) resultado.push(encontrado);
      } else if (options.search) {
        //Si no tiene id pregunto si tiene search.
        resultado = await this.model.search(options.search);
      }
    }
    return resultado;
  }
  async getOne(options: Options): Promise<Peli> {
    const pelis = await this.get(options);
    const peli = pelis[0];
    return peli;
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}
export { PelisController };
