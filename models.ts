import * as jsonfile from 'jsonfile'

type SearchOptions = { title?: string | number, tag?: string }
class Peli {
  id: number
  title: string
  tags: string[]
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('./pelis.json').then((res) => {
      return res
    })
  }
  async getById(id: number): Promise<Peli> {
    const movies = await this.getAll()
    const movie = movies.find(mov => mov.id === id)
    console.log(movie)
    return movie
  }
  async add(peli: Peli): Promise<boolean> {
    const movies = await this.getAll()
    const isRepeat = movies.some(movie => movie.id === peli.id)
    if (!isRepeat) {
      const data = movies
      data.push(peli)
      return jsonfile.writeFile('./pelis.json', data).then(() => {
        return true
      })
    } else {
      return false
    }
  }
  async search(options:SearchOptions): Promise<any> {
    const movies = await this.getAll()
    if (options.tag && options.title) {
      return movies.filter((movie) => {
        return movie.tags.includes(options.tag) && movie.title.includes(options.title.toString()) 
      })
    } else if (options.title) {
      return movies.filter((movie) => {
        return movie.title.includes(options.title.toString())
      })
    } 


    if (options.tag) {
      return movies.filter((movie) => {
        return movie.tags.includes(options.tag);
      });
    }
  }
    
}
export { PelisCollection, Peli }
