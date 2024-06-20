import { title } from "process";
import { PelisCollection, Peli, SearchOptions } from "./models";
import { Console } from "console";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options?: Options): Promise<any> {
    if (options?.id) {
      console.log(options.id);
      return this.pelis.getById(options.id);
    } else if (options.search.tag && options.search.title) {
      return this.pelis.search({
        title: options.search.title,
        tag: options.search.tag,
      });
    } else if (options?.search?.title) {
      return this.pelis.search({ title: options.search.title });
    } else if (options?.search?.tag) {
      return this.pelis.search({ tag: options.search.tag });
    } else {
      return this.pelis.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelis.add(peli);
  }
}
export { PelisController, Options };

// search por title y tag

(async () => {
  const collection = new PelisController();
  const searchOptions: Options = { search: { title: "Peli 1", tag: "vieja" } }; // title
  const result = await collection.get(searchOptions);
  console.log(result);
})();

// add

// const peliNueva = new Peli(200, "Peli ", ["nueva"]);

// (async () => {
//   const collection = new PelisController();
//   const peliAgregada = await collection.add(peliNueva);
//   console.table(peliAgregada);
// })();
