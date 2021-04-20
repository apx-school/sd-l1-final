import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];

  getAll(): Promise<any> {
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
      let resultado = json;
      if (options.hasOwnProperty("title") && options.hasOwnProperty("tag")) {
        resultado = json.filter((p) => {
          return p.title.includes(options.title);
        });
        resultado = json.filter((p) => {
          return p.tags.includes(options.tag);
        });
        return resultado;
      }
      if (options.hasOwnProperty("title")) {
        resultado = json.filter((p) => {
          return p.title.includes(options.title);
        });
        return resultado;
      }
      if (options.hasOwnProperty("tag")) {
        resultado = json.filter((p) => {
          return p.tags.includes(options.tag);
        });
        return resultado;
      }
    });
  }
  add(Peli: Peli) {
    return this.getAll().then((json) => {
      const existe = json.find((p) => {
        return p.id == Peli.id;
      });
      if (existe) {
        console.log("Este id ya existe :(");
        return false;
      } else {
        return this.getAll().then((json) => {
          json.push(Peli);
          console.log("¡Peli guardada!");
          return jsonfile.writeFile("./pelis.json", json).then(() => true);
        });
      }
    });
  }
}
export { PelisCollection, Peli };
