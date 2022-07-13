import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile('./pelis.json');
  }

  async getById(id: number) {
    const movies = await this.getAll();
    return movies.find((e) => {
      return e.id == id;
    });
  }

  async search(options: any) {
    const movies = await this.getAll();
    if (options.title && options.tags) {
      return movies.filter(
        (e) => e.title.includes(options.title) && e.tags.includes(options.tags)
      );
    } else if (options.title) {
      return movies.filter((e) => e.title.includes(options.title));
    } else if (options.tags) {
      return movies.filter((e) => e.tags.includes(options.tags));
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
