import { PelisCollection, Peli } from "./models";

class PelisController {
  dataModels: PelisCollection;
  constructor() {
    this.dataModels = new PelisCollection();
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.dataModels.getById(options.id);
    }
    if (options.search) {
      return this.dataModels.search(options.search);
    } else {
      return this.dataModels.getAll();
    }
  }
  add(peli: Peli) {
    return this.dataModels.add(peli);
  }
}

export { PelisController };
/* codigo para test unitarios manuales
function main() {
  const dataMock = new PelisController();
  const promesaMock = dataMock.get({ title: "carroza", tag: "nacional" });
  // console.log(promesaMock);
}
main()
*/
