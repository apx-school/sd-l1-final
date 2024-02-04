import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  async get(options?: Options): Promise<any> {
    if (options.id) {
      return this.data.getById(options.id);
    }
    if (options.search) {
      const searchOptions = options.search;
      if (searchOptions.title && searchOptions.tag) {
        return this.data.search({
          title: searchOptions.title,
          tag: searchOptions.tag,
        });
      } else if (searchOptions.title) {
        return this.data.search({ title: searchOptions.title });
      } else if (searchOptions.tag) {
        return this.data.search({ tag: searchOptions.tag });
      }
    }
    return this.data.getAll();
  }
  async add(peli: Peli): Promise<any> {
    try {
      // // Crear la nueva película
      const nuevaPeli = new Peli();
      nuevaPeli.id = peli.id;
      nuevaPeli.title = peli.title;
      nuevaPeli.tags = peli.tags;
      const resultado = await this.data.add(nuevaPeli);
      return resultado;
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false; // Manejar el error y devolver false
    }
  }
}
export { PelisController };

const prueba = new PelisController();

// // Ejemplo 1: Obtener película por ID
// prueba.get({ id: 1 }).then((result) => console.log("Ejemplo 1:", result));

// // Ejemplo 2: Buscar películas por título
// prueba
//   .get({ search: { title: "la" } })
//   .then((result) => console.log("Ejemplo 2:", result));

// // // // Ejemplo 3: Buscar películas por tag
// prueba
//   .get({ search: { tag: "comedia" } })
//   .then((result) => console.log("Ejemplo 3:", result));

// // // Ejemplo 4: Buscar películas por título y tag
// prueba
//   .get({ search: { title: "pr", tag: "aventura" } })
//   .then((result) => console.log("Ejemplo 4:", result));

// prueba
//   .add({
//     id: 222,
//     title: "no se",
//     tags: ["misterio", "aventura"],
//   })
//   .then((result) => console.log("Ejemplo 5:", result));
