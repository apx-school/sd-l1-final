import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
//Se define una clase PelisController con una propiedad pelisCollection que almacenará una instancia de PelisCollection.
class PelisController {
  pelisCollection: PelisCollection;
  // constructor() {
  //   (async () => {
  //     this.pelisCollection = new PelisCollection();
  //     await this.pelisCollection.init();
  //   })();
  // }
  //El constructor de la clase inicializa pelisCollection creando una nueva instancia de PelisCollection. Esto prepara el controlador para operar con la colección de películas.

  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  //Definición del método get que es asíncrono y puede aceptar un objeto Options como parámetro. Devuelve una promesa que puede resolver un objeto Peli o un arreglo de objetos Peli.
  async get(options?: Options): Promise<Peli | Peli[]> {
    // Sin parametros Si no se pasan options, el método devuelve todas las películas utilizando el método getAll de pelisCollection.
    if (options == undefined) {
      return await this.pelisCollection.getAll();
    }
    // options con id Si options contiene un id, el método busca una película específica por ese id utilizando el método getById de pelisCollection.
    if (options.id != undefined) {
      return await this.pelisCollection.getById(options.id);
    }
    // options con title y tag Si options incluye un objeto search, utiliza dicho objeto para buscar películas que coincidan con los criterios especificados en title y/o tag mediante el método search de pelisCollection.

    if (options.search) {
      const movies = await this.pelisCollection.search(options.search);
      return movies;
      // if (movies.length) {
      //   return movies;
      // } else {
      //   return "No se encontraron peliculas con esos filtros";
      // }
    }
  }
  //Método add que es asíncrono y acepta un objeto Peli como parámetro. Añade la película a la colección utilizando el método add de pelisCollection.
  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}

export { PelisController };
