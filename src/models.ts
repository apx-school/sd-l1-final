import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string; };

class PelisCollection {
  peli: Peli[] = [];
  data: string = "./pelis.json";

  async getAll(): Promise<Peli[]> {
    this.peli = await jsonfile.readFile(this.data) || [];
    return this.peli;
  };


  async getById(id: number): Promise<Peli | undefined> {
    const peliculas = await this.getAll()
    return peliculas.find(pelicula => pelicula.id === id)
  }
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      this.peli.push(peli);
      await jsonfile.writeFile(this.data, this.peli);
      return true;
    }
  }
  async search(option: SearchOptions): Promise<Peli[]> {
    const peliculas = await this.getAll();
    let resultado: Peli[] = peliculas;

    if (option.title) {
      resultado = resultado.filter(peli => peli.title.toLocaleLowerCase().includes(option.title.toLocaleLowerCase()));
    }
    if (option.tag) {
      resultado = resultado.filter(peli => peli.tags.includes(option.tag));
    }
    return resultado;
  }

}
export { PelisCollection, Peli };