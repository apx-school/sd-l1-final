import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Promise<any>;
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      this.data = res;
      return [];
    });
  }
  getById(id: number) {
    return this.data.then((res) => {
      return res.find((item) => {
        return item.id == id;
      });
    });
  }
  search(options: any) {
    return this.data.then((res) => {
      if (options.hasOwnProperty("title")) {
        return res.filter((item) => {
          return item.title.includes(options.title);
        });
      } else if (options.hasOwnProperty("title")) {
        return res.filter((item) => {
          return item.title.includes(options.title);
        });
      }
    });
  }
}

const main = () => {
  const prueba = new PelisCollection();
  console.log(prueba.getAll());
  console.log(prueba.data);
};

main();

export { PelisCollection, Peli };
