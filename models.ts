import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];

  getAll() {
    return jsonfile.readFile("./pelis.json").then((json) => {
      return json;
    });
  }
  getById(id: number) {
    return this.getAll().then((json) => {
      return json.find((item) => item.id == id);
    });
  }
  search(options: any) {
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
      if (options.tag) {
        return json.filter((item) => item.tags.includes(options.tag));
      }
    });
  }

  add(Peli: Peli) {
    return this.getAll().then((json) => {
      const exist = json.find((p) => {
        return p.id == Peli.id;
      });
      if (!exist) {
        json.push(Peli);
        return jsonfile.writeFile("./pelis.json", json);
      }
    });
  }
}
export { PelisCollection, Peli };
