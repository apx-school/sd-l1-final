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
      this.peliculas = json;
      return this.peliculas;
    });
  }
  getById(id: number) {
    return this.getAll().then((json) => {
      const encuentraId = json.find((item) => item.id == id);
      return encuentraId;
    });
  }
  search(options: any) {
    return this.getAll().then((json) => {
      if (options.title && options.tag) {
        return json.filter(
          (json) =>
            json.title.includes(options.title) &&
            json.tags.includes(options.tag)
        );
      }

      if (options.title) {
        return json.filter((json) => {
          json.title.includes(options.title);
        });
      }
      if (options.tag) {
        return json.filter((json) => {
          json.tags.includes(options.tags);
        });
      }
    });
  }

  add(Peli: Peli) {
    return this.getAll().then((json) => {
      if (
        json.find((p) => {
          return p.id == Peli.id;
        })
      ) {
        return false;
      } else {
        json.push(Peli);
        jsonfile.writeFile("./pelis.json", json).then(() => {
          return true;
        });
      }
    });
  }
}
export { PelisCollection, Peli };
