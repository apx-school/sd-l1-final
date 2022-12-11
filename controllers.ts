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
  async get(options?: any) {
    console.log(options);

    if (!options) {
      return await this.pelisCollection.getAll();
    } else if (options.id) {
      return await this.pelisCollection.getById(options.id);
    } else if (options.search) {
      return await this.pelisCollection.search(options.search);
    }
  }

  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}
export { PelisController /* PelisControllerOptions */ };

const mock = new PelisController();

async function main() {
  console.log(
    await mock.get({ search: { title: "Madagascar", tag: "drama" } })
  );
}

main();
