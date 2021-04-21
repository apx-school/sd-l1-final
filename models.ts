import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((pel) => {
      this.data = pel;
    });
    return promesa;
  }

  getById(id) {
    const promesaPeliId = this.getAll().then((pel) => {
      return pel.find((item) => {
        return item.id == id;
      });
    });
    return promesaPeliId;
  }
  // pasa cuando quiere
  search(options: any) {
    return this.getAll().then((pel) => {
      var datos = pel;
      if (options.hasOwnProperty("title") && options.hasOwnProperty("tag")) {
        datos = pel.filter((p) => {
          return p.title.includes(options.title);
        });

        datos = datos.filter((p) => {
          return p.tags.includes(options.tag);
        });

        return datos;
      }
      if (options.hasOwnProperty("title")) {
        datos = pel.filter((p) => {
          return p.title.includes(options.title);
        });
        return datos;
      }
      if (options.hasOwnProperty("tag")) {
        datos = datos.filter((p) => {
          return p.tags.includes(options.tag);
        });
        return datos;
      }
    });
  }
  // pasa cuando quiere
  add(peli: Peli) {
    return this.getAll().then((pel) => {
      const repetida = this.data.find((i) => {
        return i.id == peli.id;
      });
      if (repetida) {
        false;
      } else {
        this.data.push(peli);
        jsonfile.writeFile("./pelis.json", this.data);
        return true;
      }
    });
  }
}
export { PelisCollection, Peli };
