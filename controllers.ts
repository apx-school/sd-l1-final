import { PelisCollection, Peli } from "./models";

class PelisController {
  peli: any;
  promise: Promise<Peli[]>;
  constructor() {
    this.peli = new PelisCollection();
    const promise = this.peli.getAll().then((promisePelis) => {
      this.promise = promisePelis;
    });
    this.promise = promise;
  }
  async add(peli) {
    return await this.peli.add(peli);
  }
  async get(options) {
    if (options._[0] == ["search"] && options.title && options.tag) {
      const byTitleAndTags = await this.peli.search(options);
      return byTitleAndTags;
    } else if (options._[0] == ["search"] && options.title) {
      const byTitle = await this.peli.search(options);
      return byTitle;
    } else if (options._[0] == ["search"] && options.tag) {
      const byTag = await this.peli.search(options);
      return byTag;
    } else if (options._[0] == ["get"]) {
      const byId = await this.peli.getById(options._[1]);
      return byId;
    } else if (options._[0] == ["add"]) {
      delete options._;
      return await this.add(options);
    } else {
      return await this.promise;
    }
  }
}

export { PelisController };
