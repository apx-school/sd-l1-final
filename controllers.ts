import { PelisCollection, Peli } from "./models";

class PelisController {
  peli: any;
  constructor() {
    this.peli = new PelisCollection();
  }
  async add(peli) {
    return this.peli.add(peli);
  }
  async get(options) {
    /* if (options._[0] == "search" && options.title && options.tag) {
      const byTitleAndTags = await this.peli.search(options);
      return byTitleAndTags;
    } else if (options._[0] == "search" && options.title) {
      const byTitle = await this.peli.search(options);
      return byTitle;
    } else if (options._[0] == "search" && options.tag) {
      const byTag = await this.peli.search(options);
      return byTag;
    } else if (options._[0] == "get") {
      const byId = await this.peli.getById(options._[1]);
      return byId;
    } else {
      return this.peli.getAll();
    }
  } */
    if (options.id) {
      return await this.peli.getById(options.id);
    }
    if (options.search) {
      return await this.peli.search(options.search);
    }
    return await this.peli.getAll();
  }
}

export { PelisController };
