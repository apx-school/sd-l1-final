import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((d) => {
      return d;
    });
  }

  async getById(id: number): Promise<Peli> {
    try {
      const movies = await this.getAll()
      const movie = movies.find(m => m.id === id)
      return movie
    } catch (err) {
      console.log(err)
    }
  }

  async add(peli: Peli): Promise<Boolean> {
    try {
      const exists = await this.getById(peli.id)
      const movies = await this.getAll()
      const arrayMovies = [...movies, { ...peli }]
      if (exists) return Promise.resolve(false)
      const promesaWrite = jsonfile.writeFile(__dirname + "/pelis.json", arrayMovies).then(() => {
        return true
      })
      return promesaWrite
    } catch (err) {
      console.log(err)
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    try {
      const movies = await this.getAll()
      return new Promise((resolve) => {
        if (options.title) {
          const filteredMovies = movies.filter(movie => movie.title.includes(options.title))
          resolve(filteredMovies)
        } else if (options.tag) {
          const filteredMovies = movies.filter(movie => movie.tags.includes(options.tag))
          resolve(filteredMovies)
        }
        resolve(movies)
      })
    } catch (err) {
      console.log(err)
    }
  }
}



export { PelisCollection, Peli }