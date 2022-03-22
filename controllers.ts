import { PelisCollection, Peli } from "./models";
//TODO fijarse que se agregen pelis de consola al json correctamente
class PelisController {
  
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get({ id, search }: any): Promise<any> {

    if (id) {
      return await this.pelisCollection.getById(id);
    }

    if (search) {
      console.log(search)
      return await this.pelisCollection.search(search);
    }

    if (!id && !search) {
      return await this.pelisCollection.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelisCollection.add(peli);
  }
}
// async function test() {
//   const controller = new PelisController();
//   await controller.add({
//     id: 333,
//     title: "titulo",
//     tags: ["classic", "comedia"],
//   });

//   const pelis = await controller.get({ search: { title: "star wars" } });
//   console.log(pelis)
//   // t.is(pelis.length, 1);
//   // t.is(pelis[0].id, TEST_ID);

//   const peliculas = await controller.get({
//     search: { title: "a", tag: "acción" },
//   });
//   console.log(peliculas)
// }
// test()


export { PelisController };
