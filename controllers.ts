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
  async get(options) {
    if (options._[0] == ["search"] && options.title) {
      const byTitle = await this.peli.search(options);
      console.log("console log de title (controllers.ts): ", byTitle);
      return byTitle;
    } else if (options._[0] == ["search"] && options.tag) {
      const byTag = await this.peli.search(options);
      console.log("console log de tag (controllers.ts): ", byTag);
      return byTag;
    } else if (options._[0] == ["get"]) {
      const byId = await this.peli.getById(options._[1]);
      console.log("console log de get (controllers.ts): ", byId);
      return byId;
    } else if (options._[0] == ["add"]) {
      delete options._;
      const newPeli = await this.peli.add(options);
      console.log("console log de add (controllers.ts): ", newPeli);
      return newPeli;
    } else {
      return this.promise;
    }
  }
}

export { PelisController };
