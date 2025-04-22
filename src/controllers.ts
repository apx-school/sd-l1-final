import { PelisCollection, Peli } from "./models";
import jsonfile from "jsonfile";

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    if (!options || (!options.id && !options.search)) {
      return await this.model.getAll();
    }
    if (options.id) {
      return [await this.model.getById(options.id)];
    }
    if (options.search.tag && options.search.title) {
      const tag = { tag: options.search.tag.trim().toLocaleLowerCase() };
      const pelisTags = await this.model.search(tag);
      const pelisFiltradas = pelisTags.filter(p => {
        return p.title.trim().toLocaleLowerCase().includes(options.search.title.trim().toLocaleLowerCase());
      });
      return pelisFiltradas;
    }
    if (options.search) {
      return await this.model.search(options.search);
    }
  }

  async getOne(options: Options): Promise<Peli> {
    const array = await this.get(options);
    if (array.length == 0) {
      throw Error("Error")
    }
    return array[0];
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }


}

// async function main() {
//   const a = new PelisController();
//   const res = await a.getOne({ id: 4321865 });
//   console.log(res);
// }

// main();


type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  }
}
export { PelisController };
