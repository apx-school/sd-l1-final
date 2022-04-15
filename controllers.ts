import { PelisCollection } from "./models";
class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }

  get(options): Promise<any> {
    if (options.id) {
      return this.data.getById(options.id).then((res) => {
        return res;
      });
    } else if (options.search) {
      return this.data.search(options.search).then((res) => {
        return res;
      });
    } else {
      return this.data.getAll().then((res) => {
        return res;
      });
    }
  }
  add(peli): Promise<boolean> {
    return this.data.add(peli).then((res) => {
      return res;
    });
  }
}
export { PelisController };
