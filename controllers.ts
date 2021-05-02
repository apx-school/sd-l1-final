import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisColl: PelisCollection;
  constructor() {
    this.pelisColl = new PelisCollection();
  }
  get(options) {
    let response;
    if (options.id) {
      return this.pelisColl.getById(options.id).then((res) => {
        return (response = res);
      });
    } else if (options.search) {
      return this.pelisColl.search(options.search).then((res) => {
        return (response = res);
      });
    } else {
      return this.pelisColl.getAll().then((res) => {
        return (response = res);
      });
    }
    return response;
  }
  add(peli: Peli) {
    return this.pelisColl.add(peli).then((res) => {
      return res;
    });
  }
}
export { PelisController };
