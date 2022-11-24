import { PelisCollection, Peli } from "./models";

/* class PelisControllerOptions {
  id: number;
  search: {
    title: string;
    tag: string;
  };
} */

class PelisController {
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
    this.pelisCollection.getAll();
  }
  async get(options: any) {
    if (options.id) {
      return await this.pelisCollection.getById(options.id);
    } else if (options.search) {
      if (options.search.title) {
        return await this.pelisCollection.search(options.search.title);
      } else if (options.search.tag) {
        return await this.pelisCollection.search(options.search.tag);
      } else if (options.search.title && options.search.tag) {
        return await (this.pelisCollection.search(options.search.title) &&
          this.pelisCollection.search(options.search.tag));
      } else {
        return await this.pelisCollection.getAll();
      }
    }
  }
  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}
export { PelisController /* PelisControllerOptions */ };

/* const mock = new PelisController();

async function main() {
  console.log(await mock.get({ id: 4 }));
}

main(); */
