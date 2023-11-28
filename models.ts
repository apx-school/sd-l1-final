import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {


  
   getAll(): Peli[] {
    const peliculas: Peli[]=  jsonfile.readFile("./pelis.json");
    return peliculas;
  }
  async getById(id:number): Promise<Peli> {
    const peliculas: Peli[]= await this.getAll();
    const PeliId = peliculas.find((p) => {
      return p.id == id;
    });
    return PeliId;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliculas: Peli[] = await this.getAll();
    const peliExiste = peliculas.find((p) => {
      return p.id == peli.id;
    });
    if (peliExiste) {
      return false;
    } else {
      peliculas.push(peli);
      await jsonfile.writeFile("./pelis.json", peliculas);
      return true;
    }
  }

  async search(pelicula: any): Promise<Peli[]> {
    const peliculas: Peli[] = await this.getAll();
    if (pelicula.title && pelicula.tag) {
      return peliculas.filter((p) => {
        return (
          p.title.includes(pelicula.title) && p.tags.includes(pelicula.tag)
        );
      });
    } else if (pelicula.title) {
      return peliculas.filter((p) => {
        return p.title.includes(pelicula.title);
      });
    } else if (pelicula.tag) {
      return peliculas.filter((p) => {
        return p.tags.includes(pelicula.tag);
      });
    }
  }

 }
export { PelisCollection, Peli };
