import { PelisCollection, Peli, SearchOptions } from "./models";


class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }

  async getMovies(): Promise<Peli[]>{
    return this.peliculas.getAll();
  }

  async get(id: number): Promise<Peli | null>{
    const peliId = await this.peliculas.getById(id);
    return peliId ? peliId : null;
  }

  async search(options:SearchOptions): Promise<Peli[]>{
    const busquedaPeli = await this.peliculas.search(options);
    return busquedaPeli;
  }

  async add(peli: Peli): Promise<boolean>{
    const agregarPeli = await this.peliculas.add(peli);
    return agregarPeli;
  }

  async getByTitle(title: string): Promise <Peli[]>{
    const option: SearchOptions = { title };
    const peliculaPorTitulo = await this.peliculas.search(option);
    return peliculaPorTitulo;
  }

  async getByTag(tag: string): Promise <Peli[]>{
    const option: SearchOptions = { tags: [tag] };
    const peliculaPorTag = await this.peliculas.search(option);
    return peliculaPorTag;
  }

  async getByTagAndTitle(tag: string, title: string): Promise <Peli[]>{
    const option: SearchOptions = { title,  tags: [tag] };
    const peliculaPorTagAndTitle = await this.peliculas.search(option);
    return peliculaPorTagAndTitle;
  }
  
}
export { PelisController };
