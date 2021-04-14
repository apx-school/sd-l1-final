import * as jsonfile from "jsonfile";
import { rejects } from "node:assert";
import { resolve } from "node:path";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile("pelis.json")
      .then((r) => {
        // la respuesta de la promesa
        return r;
      })
      .catch((err) => {
        return err;
      });
  }
  async getById(id: number) {
    const pelis = await this.getAll();
    let pelisFiltered;
    pelis.forEach((item) => {
      if (item.id == id) {
        pelisFiltered = item;
      }
    });
    if (pelisFiltered == undefined) {
      return false;
    }
    return pelisFiltered;
  }
  async search(options: any) {
    let pelisFiltered = await this.getAll();
    if ("title" in options) {
      pelisFiltered = pelisFiltered.filter(({ title }) =>
        title.toLowerCase().includes(options.title.toLowerCase())
      );
    }
    if ("tag" in options) {
      pelisFiltered = pelisFiltered.filter((item) => {
        return item.tags.includes(options.tag.toLowerCase());
      });
    }
    return pelisFiltered;
  }
  async add(peli: Peli) {
    const pelis = await this.getAll();

    const flag = pelis.filter((item) => item.id == peli.id);
    //Si la longitud del array es 0 significa que el metodo filter
    // no encontró ninguna pelicula existente con ese ID
    if (flag.length == 0) {
      pelis.push(peli);
      jsonfile.writeFile("pelis.json", pelis);
      return true;
    } else {
      console.error(
        "La peli no se ha podido añadir, ID existente o formato incorrecto"
      );
      return false;
    }
  }
}

export { PelisCollection, Peli };
