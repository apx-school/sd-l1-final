import { PelisCollection, Peli } from "./models";

export type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

export class PelisController {
  peliCollection: PelisCollection;

  constructor() {
    this.peliCollection = new PelisCollection();
  }

  async get(options?: Options) {
    try {
      this.peliCollection.data = await this.peliCollection.getAll();
      if (options) {
        if (options.id && !options.search) {
          // Si el objeto tiene la property id, debe devolver la película con ese id.
          const peli = await this.peliCollection.getById(options.id);
          if (peli) {
            return peli;
          } else {
            return new Error("Película no encontrada");
          }
        } else if (options.search?.title && !options.search.tag) {
          // Si el objeto search tiene la property title, debe buscar las pelis que tengan ese string en el título.
          return await this.peliCollection.search({
            title: options.search.title,
          });
        } else if (
          !options.id &&
          options.search?.tag &&
          !options.search.title
        ) {
          // Si el objeto search tiene la property tag, debe buscar las pelis que tengan ese tag.
          return await this.peliCollection.search({ tag: options.search.tag });
        } else if (options.search?.title && options.search.tag) {
          // Puede recibir las dos opciones.
          return await this.peliCollection.search({
            title: options.search.title,
            tag: options.search.tag,
          });
        }
      }
      // Si no recibe ningún parámetro, debe devolver todas las películas.
      return this.peliCollection;
    } catch (error) {
      throw error;
    }
  }

  async add(peli: Peli) {
    try {
      const operationWasSuccesfull = await this.peliCollection.add(peli);
      if (operationWasSuccesfull) {
        console.log("Lista actualizada exitosamente: ");
        const nuevaLista = await this.get();
        return nuevaLista;
      }
    } catch (error) {
      throw error;
    }
  }
}
