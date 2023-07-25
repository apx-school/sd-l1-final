import { PelisCollection, Peli } from "./models";
type Options = {
  id?:number
  search?:{
    title?:string
    tag?:string
  }
}
class PelisController {
  movies: PelisCollection
  constructor() {
    this.movies = new PelisCollection()
  }

  async get(options?:Options) {
    
    if(!options) return await this.movies.getAll()
    
    if (options.id) {
      return await this.movies.getById(options.id).then(res => {return res})
    } 
    if(options.search) {
      if (options.search.tag && options.search.title) {
        const moviesFiltered = await this.movies.search(options.search)
        return moviesFiltered
      }
      if (options.search.tag) {
        const moviesFiltered = await this.movies.search(options.search)
        return moviesFiltered
      }
      if (options.search.title) {
        const moviesFiltered = await this.movies.search(options.search)
        return moviesFiltered
      }
    } 
  }
  async add(peli:Peli) {
    return await this.movies.add(peli)
  }
}
export { PelisController };
