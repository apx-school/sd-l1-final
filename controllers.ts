import { type } from "os";
import { title } from "process";
import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
    this.pelisCollection.getAll();
  }

  async get(option: Options): Promise<any> {
    if (option.id) {
      const peli = await this.pelisCollection.getById(option.id);
      return peli;
    } else if (option.search.tag && option.search.title) {
      const peli = await this.pelisCollection.search(option.search);
      return peli;
    } else if (option.search.title && !option.search.tag) {
      const peli = await this.pelisCollection.search({
        title: option.search.title,
      });
      return peli;
    } else if (option.search.tag && !option.search.title) {
      const peli = await this.pelisCollection.search({
        tag: option.search.tag,
      });
      return peli;
    } else {
      return this.pelisCollection.getAll();
    }
  }

  async add(peli: Peli) {
    const peliAdd = await this.pelisCollection.add(peli);
    return peliAdd;
  }
}

// async function imprimir() {
//   const lista = new PelisController();
//   const mockPeli = await lista.get({ search: { tag: "Crimen" } });
//   console.log("Controllers.ts");
//   return console.log(mockPeli);
// }

// imprimir();

export { PelisController };
