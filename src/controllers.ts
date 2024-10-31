import { PelisCollection, Peli } from "./models";

class PelisController {
  private pelisCollection: PelisCollection; //propiedad interna
  constructor() {
    this.pelisCollection = new PelisCollection(); //Instanciacion del modelo
  }

  async get(options?: {
    id?: number;
    search?: { title?: string; tag?: string };
  }) {
    if (options?.id) {
      const peli = await this.pelisCollection.getById(options.id);
      return peli;
    } else if (options?.search) {
      return await this.pelisCollection.search(options.search);
    } else return await this.pelisCollection.getAll();
  }

  async add(peli: Peli) {
    const resultado = await this.pelisCollection.add(peli);
    return resultado;
  }
}

//El símbolo ? en TypeScript se utiliza para indicar que una propiedad es opcional. Esto significa que no es necesario que esa propiedad esté presente cuando se crea un objeto de ese tipo.
//definicion del tipo Options

// type Options = {
//   id?: number;
//   search?: {
//     title?: string;
//     tag?: string;
//   };
// };
export { PelisController };
