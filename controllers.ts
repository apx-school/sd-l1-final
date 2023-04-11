import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options: Options): Promise<any> {
    if (options.id) {
      const filmFound = await this.collection.getById(options.id);
      return filmFound ? filmFound : "No film exists that match the entered id";
    }

    if (options.search) {
      const filmFound = await this.collection.search(options.search);
      return filmFound.length > 0
        ? filmFound
        : "There are no films that match the parameters entered";
    }
  }

  async add(peli: Peli) {
    const addFilm = await this.collection.add(peli);
    return addFilm
      ? "Film added correctly"
      : "A movie with this id already exists";
  }
}

export { PelisController };
