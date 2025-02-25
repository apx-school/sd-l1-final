import * as jsonfile from 'jsonfile';
// El siguiente import no se usa pero es necesario
import './pelis.json';
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const peliculas = await jsonfile.readFile('./pelis.json');
    return peliculas;
  }

  async add(pelicula: Peli): Promise<boolean> {
    const peliculas = await this.getAll();

    const peliExists = await this.getById(pelicula.id);

    if (peliExists) {
      return false;
    }

    peliculas.push(pelicula);

    await jsonfile.writeFile('./pelis.json', peliculas);
    return true;
  }

  async getById(id: Peli['id']): Promise<Peli> {
    const peliculas = await this.getAll();
    return peliculas.find((peli) => peli.id === id);
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const peliculas = await this.getAll();

    const peliculasFiltradas = peliculas.filter(function (p) {
      const { tag, title } = options;

      const coincideTag = tag ? p.tags.includes(tag) : true;
      const coincideTitle = title ? p.title.includes(title) : true;

      return coincideTag && coincideTitle;
    });
    return peliculasFiltradas;
  }
}

export { PelisCollection, Peli };
