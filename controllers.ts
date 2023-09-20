import { PelisCollection, Peli } from "./models";

type Options = {

  id?: number;

  search?: {

    title?: string;

    tag?: string;

  };

};

class PelisController {
  pelisCollection: PelisCollection
  constructor() {
    this.pelisCollection = new PelisCollection()
  }

  async get(options: Options): Promise<Peli[] | Peli> {
    try {
      const movies = await this.pelisCollection.getAll()
      console.log(movies)
      if (options.id) {
        const peli = movies.find(m => m.id === options.id)
        return peli
      }

      if (options.search.title && !options.search.tag) {
        const pelis = await this.pelisCollection.search({ title: options.search.title })
        return pelis
      }

      if (options.search.tag && !options.search.title) {
        const pelis = await this.pelisCollection.search({ tag: options.search.tag })
        return pelis
      }

      if (options.search.tag && options.search.title) {
        const pelisByTag = await this.pelisCollection.search({ tag: options.search.tag })
        const pelisByTitle = await this.pelisCollection.search({ tag: options.search.title })
        const allPelis = [...pelisByTag, ...pelisByTitle]
        return allPelis

      }
    } catch (err) {
      console.log(err)
    }
  }

  async add(peli: Peli) {
    try {
      await this.pelisCollection.add(peli)
    } catch (err) {
      console.log(err)
    }
  }
}
export { PelisController };
