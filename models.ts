import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      return res;
    });
  }
  getById(id: number) {
    return this.getAll().then((res) => {
      return res.find((i) => i.id === id);
    });
  }
  search(options: any) {
    try {
      return this.getAll().then((res) => {
        if (options.title && options.tags) {
          return res.filter((i) => {
            return (
              i.title.includes(options.title) && i.tags.includes(options.tags)
            );
          });
        } else if (options.title) {
          return res.filter((i) => i.title.includes(options.title));
        } else if (options.tags) {
          return res.filter((i) => i.tags.includes(options.tags));
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const nueva = new PelisCollection();
nueva.search({ title: "El" }).then((res) => console.log(res));

export { PelisCollection, Peli };
