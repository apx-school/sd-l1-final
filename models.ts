import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = []

  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }
  

  async getById(id: number): Promise<any> {
    let peliculas = await this.getAll()
    return peliculas.find(z => z.id == id);
  }


  async search(option: any): Promise<any> {
    let peliculas = await this.getAll();

    if (option.title && option.tag) {
      return peliculas.filter((pelicula) => {
        const titulos = pelicula.title.includes(option.title);
        const tags = pelicula.tags.includes(option.tag);
        return titulos && tags;
      });
    } else if(option.title) {
      return peliculas.filter(x => x.title.includes(option.title));
    } else if(option.tag) {
      return peliculas.filter(x => x.tags.find( (tag: any) => tag == option.tag) == option.tag);
    }
  }


  async add(peli: Peli): Promise<boolean> {
    const EXISTE_ID = await this.getById(peli.id);
    if (EXISTE_ID) {
      return false;
    } else {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      await jsonfile.writeFile("./pelis.json", peliculas);
      return true;
    } 
  }

}
export { PelisCollection, Peli };
