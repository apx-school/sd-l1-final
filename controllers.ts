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
    const newPeliCollection = new PelisCollection();
    const populatedPeliCollection = newPeliCollection;
    this.peliCollection = populatedPeliCollection;
  }
  async get(options?: Options) {
    this.peliCollection.data = await this.peliCollection.getAll();
    if (options?.id && !options?.search) {
      // Si el objeto tiene la propiedad id, debe devolver la película con ese id.
      return await this.peliCollection.getByID(options.id);
    } else if (!options?.id && options?.search.title) {
      // Si el objeto search tiene la propiedad title, debe buscar las pelis que tengan ese string en el título.
      return await this.peliCollection.search({ title: options.search.title });
    } else if (!options?.id && options?.search.tag) {
      // Si el objeto search tiene la propiedad tag, debe buscar las pelis que tengan ese tag.
      return await this.peliCollection.search({ tag: options.search.tag });
    } else if (options?.search.title && options?.search.tag) {
      // puede recibir las dos opciones.
      return await this.peliCollection.search({
        title: options.search.title,
        tag: options.search.tag,
      });
    } else {
      // Si no recibe ningún parámetro, debe devolver todas las películas.
      return this.peliCollection;
    }
  }
  async add(peli: Peli) {
    await this.peliCollection.add(peli);
  }
}
