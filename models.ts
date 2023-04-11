import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const films = await jsonfile.readFile(__dirname + "/films.json");
    return films;
  }

  async getById(id: number) {
    const films = await this.getAll();
    return films.find((film) => film.id == id);
  }

  async search(options: any) {
    const films = await this.getAll();

    if (options.title && options.tag) {
      return films.filter(
        (film) =>
          film.title
            .toLowerCase()
            .includes(options.title.toString().toLowerCase()) &&
          film.tags.includes(options.tag)
      );
    }

    if (options.title) {
      return films.filter((film) =>
        film.title
          .toLowerCase()
          .includes(options.title.toString().toLowerCase())
      );
    }

    if (options.tag) {
      return films.filter((film) => film.tags.includes(options.tag));
    }
  }

  async add(peli: Peli) {
    const film = await this.getById(peli.id);

    if (film) {
      return false;
    } else {
      const films = await this.getAll();
      films.push(peli);
      await jsonfile.writeFile(__dirname + "/films.json", films);
      return true;
    }
  }
}

export { PelisCollection, Peli };
