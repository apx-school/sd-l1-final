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
      const data = await jsonfile.readFile('./pelis.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Oops, algo ha salido mal al intentar leer el archivo:', error);
      return [];
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const peliculas = await this.getAll();
    const peliExistente = peliculas.find(pelicula => pelicula.id === peli.id);

    try {
      if (peliExistente) {
        return false;
      } else {
        peliculas.push(peli);
        await jsonfile.writeFile('./pelis.json', JSON.stringify(peliculas, null, 2));
        return true;
      }
    } catch (error) {
      console.error('Oops, algo ha salido mal al intentar escribir en el archivo:', error);
      return false;
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    const peliculas = await this.getAll();
    return peliculas.find(pelicula => pelicula.id === id);
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const peliculas = await this.getAll();

    if (options.title) {
      return peliculas.filter(pelicula => pelicula.title.includes(options.title));
    } else if (options.tag) {
      return peliculas.filter(pelicula => pelicula.tags.includes(options.tag));
    }

    return [];
  }
}
export { PelisCollection, Peli };
