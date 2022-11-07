import { PelisCollection, Peli } from "./models";

// class PelisControllerOptions {
//   id: any;
//   search: {};
// }

class PelisController {
  controllerPelis: PelisCollection;

  constructor() {
    this.controllerPelis = new PelisCollection();
  }

  async get(options: any) {
    await this.controllerPelis.getAll();
    if (options.id) {
      //console.log(options.id);
      return await this.controllerPelis.getById(options.id);
    }
    if (options.search) {
      //console.log(options);
      return await this.controllerPelis.search(options.search);
    }
    return await this.controllerPelis.getAll();
  }

  async add(peli: Peli) {
    return await this.controllerPelis.add(peli);
  }
}
export { PelisController };
