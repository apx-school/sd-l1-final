import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;

  constructor() {
    this.data = new PelisCollection();
  }

  get(options: any): Promise<any> {
    if (options.id) {
      const result = this.data.getById(options.id).then((r) => {
        return r;
      });
      return result;
    }
    if (options.search) {
      const result = this.data.search(options.search);
      return result;
    }
    if (options[0] == null) {
      const result = this.data.getAll().then((r) => {
        return r;
      });
      return result;
    }
  }

  add(peli: Peli) {
    return this.data.add(peli).then((result) => {
      return result;
    });
  }
}
export { PelisController };
