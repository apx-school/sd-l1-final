import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  private readonly filePath = "./pelis.json";

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.filePath).catch(() => {
      return [];
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => p.id == id);
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaGetById = this.getById(peli.id);
    
    return promesaGetById.then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          const promesaWriteFile = jsonfile.writeFile(this.filePath, pelis);
          return promesaWriteFile.then(() => true);
        });
      }
    }).catch(() => {
        return false;
    });
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    let pelisFiltradas = pelis;

    if (options.title) {
        pelisFiltradas = pelisFiltradas.filter((p) =>
        p.title.toLowerCase().includes(options.title.toLowerCase())
      );
    }

    if (options.tag) {
        pelisFiltradas = pelisFiltradas.filter((p) =>
        p.tags.map(t => t.toLowerCase()).includes(options.tag.toLowerCase())
      );
    }

    return pelisFiltradas;
  }
}

export { PelisCollection, Peli };
