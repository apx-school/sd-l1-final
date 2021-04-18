import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll() {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.data = json;
      return this.data;
    });
  }
  getById(id: number) {
    const PELIFILTRADA = this.getAll().then((res) => {
      if (res.find((p) => p.id == id) == undefined) {
        return "ID no existe";
      } else {
        return res.find((p) => p.id == id);
      }
    });
    return PELIFILTRADA;
  }
  search(options: any) {
    console.log(options);
    let searchPelis = this.getAll().then((res) => {
      let resultadoBusqueda = res;

      if (options.title) {
        resultadoBusqueda = resultadoBusqueda.filter((pelis) => {
          return pelis.title.includes(options.title);
        });
      }
      if (options.tag) {
        resultadoBusqueda = resultadoBusqueda.filter((pelis) => {
          return pelis.tags.includes(options.tag);
        });
      }

      return resultadoBusqueda;
    });

    return searchPelis;
  }
  add(peli: Peli) {
    let addPeli = this.getAll().then((pelis) => {
      let idExistente = pelis.find((p) => {
        return p.id == peli.id;
      });
      if (idExistente == undefined) {
        pelis.push(peli);
        return jsonfile.writeFile("./pelis.json", pelis).then(() => {
          return true;
        });
      } else {
        return false;
      }
    });
    return addPeli;
  }
}
export { PelisCollection, Peli };
