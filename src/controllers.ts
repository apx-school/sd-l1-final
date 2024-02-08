// import { PelisCollection, Peli } from "./models";

// class PelisController {
//   constructor() {}
// }
// export { PelisController };
import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  async get(options?: Options): Promise<any> {
    if (options.id) {
      return await this.data.getById(options.id);
    }
    if (options.search) {
      const filtro = await this.data.search(options.search);
      return filtro;
      // const searchOptions = options.search;
      // let filteredResults;
      // if (searchOptions.title && searchOptions.tag) {
      //   filteredResults = await this.data.search({
      //     title: searchOptions.title,
      //     tag: searchOptions.tag,
      //   });
      // } else if (searchOptions.title) {
      //   filteredResults = await this.data.search({
      //     title: searchOptions.title,
      //   });
      // } else if (searchOptions.tag) {
      //   filteredResults = await this.data.search({ tag: searchOptions.tag });
      // }
      // return filteredResults;
    }
    return await this.data.getAll();
  }
  async add(peli: Peli): Promise<any> {
    try {
      // // Crear la nueva película
      const nuevaPeli = new Peli();
      nuevaPeli.id = peli.id;
      nuevaPeli.title = peli.title;
      nuevaPeli.tags = peli.tags;
      const resultado = await this.data.add(nuevaPeli);
      return resultado;
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false; // Manejar el error y devolver false
    }
  }
}
export { PelisController };
