import { PelisCollection, Peli } from "./models";

class PelisController {
  modelCall: PelisCollection;

  constructor() {
    this.modelCall = new PelisCollection();
  }

  get(options: any): Promise<any> {
    if (options.id) {
      return this.modelCall.getById(options.id).then((res) => {
        return res;
      });
    }
    if (options.search) {
      return this.modelCall.search(options.search).then((res) => {
        return res;
      });
    } else {
      return this.modelCall.getAll().then((res) => {
        return res;
      });
    }
  }

  add(peli: Peli) {
    return this.modelCall.add(peli).then((res) => {
      return res;
    });
  }
}
export { PelisController };

const prueba = new PelisController();
const opciones = {
  title: "el hobbit",
};

prueba.get;
