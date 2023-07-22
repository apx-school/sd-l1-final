import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

const collection = new PelisCollection();

class PelisController {
  constructor() {}

  async add(peli: Peli) {
    return await collection.add(peli);
  }

  async get(options: Options) {
    if (!options) {
      return await collection.getAll();
    }
    if (options.id) {
      console.log(options);
      return await collection.getById(options.id).then((res) => {
        return res;
      });
    }
    if (options.search) {
      if (options.search.title && options.search.tag) {
        return await collection.search(options.search);
      }
      if (options.search.title) {
        return await collection.search(options.search);
      }
      if (options.search.tag) {
        return await collection.search(options.search);
      }
    } else {
      return await collection.getAll();
    }
  }
}

// new PelisController().get({ id: 4321865 }).then(res => console.log(res))

export { PelisController };
