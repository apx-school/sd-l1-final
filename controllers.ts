import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }

  add(pelis: Peli) {
    return this.data.add(pelis).then((res) => {
      return res;
    });
  }
  //
  get(options: any) {
    return this.data.getAll().then((res) => {
      if (options.id) {
        return this.data.getById(options.id).then((res) => {
          return res;
        });
      } else if (options.search) {
        return this.data.search(options.search).then((res) => {
          return res;
        });
      } else {
        return res;
      }
    });
  }
}
export { PelisController };
