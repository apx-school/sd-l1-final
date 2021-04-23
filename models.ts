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
      return (this.data = pel); // se pusieron parentesis no se por que. cualquier cosa sacarla
    });
    return promesa;
  }

  getById(id: number) {
    const promesaPeliId = this.getAll().then(() => {
      return this.data.find((item) => item.id == id);
    });
    return promesaPeliId;
  }
  // pasa cuando quiere
  search(options: any): Promise<any> {
    return this.getAll().then((pel) => {
      console.log(pel);
      let datos = pel;
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
      const cargaDePeli = pel.find((i) => {
        return i.id == peli.id;
      });
      if (cargaDePeli) {
        false;
      } else {
        const datos = this.data.push(peli);
        const cargaDePeli2 = jsonfile.writeFile("./pelis.json", datos);
        return cargaDePeli2.then(() => {
          return true;
        });
      }
      return cargaDePeli;
    });
  }
}
export { PelisCollection, Peli };
