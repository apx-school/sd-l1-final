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
      const searchTitleTags = movies.filter((e) => {
        return e.title.includes(options.title) && e.tags.includes(options.tags);
      });
      return searchTitleTags;
    } else if (options.title) {
      const searchTitle = movies.filter((e) => {
        return e.title.includes(options.title);
      });
      return searchTitle;
    } else if (options.tags) {
      const searchTags = movies.filter((e) => {
        return e.tags.includes(options.tags);
      });
      return searchTags;
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
