import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  async get(options) {
    if (options.id) {
      var resultado = await this.peliculas.getById(options.id);
      if (resultado != undefined) {
        console.log(resultado);
        return resultado;
      }
    }
    if (options.search) {
      resultado = await this.peliculas.search(options.search);
      return resultado;
    } else {
      return await this.peliculas.getAll();
    }
  }

  async add(peli: Peli) {
    await this.peliculas.add(peli);
  }
}
export { PelisController };
const objetoPrueba = {
  id: 11111,
  search: {
    title: "s",
    tag: ["dra"],
  },
};

const prueba = new PelisController();
prueba.get(objetoPrueba);
// prueba.get(objetoPrueba).then((i) => {
//   console.log(i);
// });
