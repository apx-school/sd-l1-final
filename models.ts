import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      return json;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((json) => {
      const movieFound = json.find((item: Peli) => item.id === id);
      return movieFound;
    });
  }

  search(options:any): Promise<Peli[]> {
    return this.getAll().then((json) => {
      if (options.title && options.tag) {
        return json.filter(
          (item) =>
            item.title.includes(options.title) &&
            item.tags.includes(options.tag)
        );
      }

      if (options.title) {
        return json.filter((item) => item.title.includes(options.title));
      }

      if (options.tags) {
        return json.filter((item) => item.tags.includes(options.tag));
      }
    });
  }

  add(movie: Peli): Promise<Boolean> {
    return this.getAll().then((json) => {
      const moviesFiltered = json.find((item: Peli) => item.id === movie.id);
      if (!moviesFiltered) {
        json.push(movie);
        return jsonfile.writeFile("./pelis.json", json).then(() => true);
      }
    });
  }
}
export { PelisCollection, Peli };
