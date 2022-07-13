import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('./pelis.json').then((movies) => {
      return movies;
    });
  }

  getById(id: number) {
    const found = this.getAll().then((movies) => {
      const result = movies.find((e) => {
        return e.id == id;
      });
      return result;
    });
    return found;
  }

  async search(options: any) {
    const movies = await this.getAll();
    if (options.title && options.tags) {
      const result = movies.filter((e) => {
        return e.title.includes(options.title) && e.tags.includes(options.tags);
      });
      return result;
    } else if (options.title) {
      const result = movies.filter((e) => {
        return e.title.includes(options.title);
      });
      return result;
    } else if (options.tags) {
      const result = movies.filter((e) => {
        return e.tags.includes(options.tags);
      });
      return result;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      const data = await this.getAll();
      data.push(peli);
      await jsonfile.writeFile('./pelis.json', data);
      return true;
    }
  }
}

export { PelisCollection, Peli };
