import { PelisCollection, Peli } from "./models";

class PelisController {
  p: PelisCollection
  constructor() {
    this.p = new PelisCollection();
  }

  //GET
  get(options: any) {
    let r
    if (options.id) {
      r = this.p.getById(options.id);
    } else if (options.search) {
      r = this.p.search(options.search);
    } else {
      r = this.p.getAll();
    };
    return r;
  };

  //ADD
  add(peli: Peli): Promise<boolean> {
    return this.p.add(peli);
  }
}
export { PelisController };
