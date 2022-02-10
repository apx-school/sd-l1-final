import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }

  async add(peli: Peli): Promise<boolean> {
    const resultado = await this.peliculas.add(peli);
    return resultado;
  }

  async get(options: any): Promise<any> {
    if (options.id) {
      return await this.peliculas.getById(options.id);
    }
    if (options.search) {
      return await this.peliculas.search(options.search);
    }
    if (options != null) {
      return await this.peliculas.getAll();
    }
  }
}

//#########################################
//Probando metodo add
//const objeto = new PelisController();
//const peliculaNueva = new Peli();
// peliculaNueva.id = 30;
// peliculaNueva.tags = ["acción", "aventura"];
// peliculaNueva.title = "Jurassic Park";

// objeto.add(peliculaNueva).then((resultado) => {
//   console.log(resultado);
// });
//#########################################
//Probando metodo get por id
/*objeto.get({ id: 182463 }).then((resultado) => {
  console.log(resultado);
});
//Probando metodo get sin parametros
objeto.get({}).then((resultado) => {
  console.log(resultado);
});*/
//Probando metodo get por search por title
//objeto.get({ search: { title: "v" } }).then((resultado) => {
//  console.log(resultado);
//});
//Probando el metodo get por search por tag
//objeto.get({ search: { tag: "y" } }).then((resultado) => {
//  console.log(resultado);
//});
//Probando el metodo get por search por tag y title
// objeto
//   .get({
//     search: { tag: "videojuego", title: "e" },
//   })
//   .then((resultado) => {
//     console.log(resultado);
//   });

export { PelisController };
