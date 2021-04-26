import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.pelis = new PelisCollection();
    const promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  get(options): Promise<any> {
    console.log(options);
    var resultado: Promise<any>;
    if (options.get) {
      resultado = this.pelis.getById(options.get);
    } else if (options.add) {
      resultado = this.pelis.add(options.add);
    } else if (options.id) {
      resultado = this.pelis.getById(options.id);
    } else if (options.search) {
      resultado = this.pelis.search(options.search);
    } else {
      resultado = this.pelis.getAll().then((pel) => {
        return pel;
      });
    }
    return resultado;
  }
  // aqui me quede
  add(peli: Peli) {
    var pelicula = new Peli();
    pelicula.id = peli.id;
    pelicula.tags = peli.tags;
    pelicula.title = peli.title;
    return this.pelis.add(pelicula);
  }
}
export { PelisController };

// mañana seguir con el index p. pasa bien los parametros pero no se porque el serach no los hace  bien
