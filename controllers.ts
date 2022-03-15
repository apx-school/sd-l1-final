import { PelisCollection, Peli } from "./models";
//TODO fijarse que se agregen pelis de consola al json correctamente
class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get({ id, search }: any): Promise<any> {
    if (id) {
      const peli: Peli = await this.pelisCollection.getById(id);
      console.log(id);
      console.log(peli);
      return peli;
    }

    if (search) {
      const res: Peli[] = await this.pelisCollection.search(search);
      return res;
    }
    if (!id && !search) {
      return await this.pelisCollection.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelisCollection.add(peli);
  }
}
const con = new PelisController();
con.get({ id: 4321865 }).then((res) => console.log(res));
export { PelisController };
