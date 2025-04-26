// El siguiente import no se usa pero es necesario
import jsonfile from 'jsonfile';
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

type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      return await jsonfile.readFile('src/pelis.json');
    } catch (error) {
      console.error('Oops, algo ha salido mal al intentar leer el archivo:', error);
      return [];
    }
  }

  async add(newMovie: Peli): Promise<boolean> {
    const movies = await this.getAll();
    const existingMovie = movies.some(movie => movie.id === newMovie.id);

    try {
      if (existingMovie) {
        console.log(`${newMovie.title} ya existe!`);
        return false;
      } else {
        movies.push(newMovie);
        await jsonfile.writeFile('src/pelis.json', movies);
        console.log(`${newMovie.title} ha sido agregada exitosamente`);
        return true;
      }
    } catch (error) {
      console.error('Oops, algo ha salido mal al intentar escribir en el archivo:', error);
      return false;
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    const movies = await this.getAll();
    return movies.find(movie => movie.id === id);
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const movies = await this.getAll();

    if (options.title) {
      return movies.filter(movie => movie.title.includes(options.title));
    } else if (options.tag) {
      return movies.filter(movie => movie.tags.includes(options.tag));
    }

    return [];
  }
}
export { PelisCollection, Peli };
