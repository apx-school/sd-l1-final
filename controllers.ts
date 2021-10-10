import { PelisCollection, Peli } from "./models";

class PelisController {
  dataModels: PelisCollection;
  constructor() {
    this.dataModels = new PelisCollection();
  }
}
export { PelisController };

function main() {
  const dataMock = new PelisController();
  const promesaMock = dataMock.dataModels.getAll().then((resp) => {
    console.log(resp);
  });
  // console.log(promesaMock);
}
main();
