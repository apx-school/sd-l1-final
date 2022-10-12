import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options: any): Promise<any> {
    if (options.id) {
      const filmFound = await this.collection.getById(options.id);

      if (filmFound) {
        return filmFound;
      } else {
        return "No film exists that match the entered id";
      }
    }

    if (options.search) {
      const filmFound = await this.collection.search(options.search);

      if (filmFound.length > 0) {
        return filmFound;
      } else {
        return "There are no films that match the parameters entered";
      }
    }
  }
  async add(peli: Peli) {
    const addFilm = await this.collection.add(peli);

    if (addFilm) {
      return "Film added correctly";
    } else {
      return "A movie with this id already exists";
    }
  }
}

export { PelisController };
