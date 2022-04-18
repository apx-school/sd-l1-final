import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }

  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find((prod) => prod.id === id);
  }

  async search(options: any): Promise<any> {
    const pelis = await this.getAll();
    if (options.title && options.tag) {
      return pelis.filter((peli) => {
        const pelisFiltradasByTitle = peli["title"].includes(options.title);
        const tagsDePelisEnLowerCase = peli.tags.map((tag) =>
          tag.toLowerCase()
        );
        const pelisFiltradasByTag = tagsDePelisEnLowerCase.includes(
          options.tag
        );
        return pelisFiltradasByTitle && pelisFiltradasByTag;
      });
    } else if (options.title) {
      return pelis.filter((peli) => peli["title"].includes(options.title));
    } else if (options.tag) {
      return pelis.filter((peli) => {
        const tagsDePelisEnLowerCase = peli.tags.map((tag) =>
          tag.toLowerCase()
        );
        return tagsDePelisEnLowerCase.includes(options.tag);
      });
    } else {
      return pelis;
    }
  }

  async add(peli: Peli): Promise<Boolean> {
    const idPeliExiste = await this.getById(peli.id);
    if (idPeliExiste) {
      return false;
    }
    const pelis = await this.getAll();
    pelis.push(peli);
    await jsonfile.writeFile("./pelis.json", pelis);
    return true;
  }
}
export { PelisCollection, Peli };
