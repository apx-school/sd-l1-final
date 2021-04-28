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
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.data = json;
      return json;
    });
  }

  getById(id: number): Promise<any> {
    return this.getAll().then((json) => {
      return json.find((item) => item.id == id);
    });
  }

  search(options: any) {
    return this.getAll().then((json) => {
      let datos = json;

      if (options.title) {
        datos = datos.filter((p) => {
          return p.title.includes(options.title);
        });
      }
      if (options.tag) {
        datos = datos.filter((p) => {
          return p.tags.includes(options.tag);
        });
      }
      return datos;
    });
  }

  add(peli: Peli): Promise<boolean> {
    const cargaDePelis = this.getById(peli.id).then((pel) => {
      if (pel) {
        return false;
      } else {
        this.data.push(peli);
        const cargaDePeli2 = jsonfile.writeFile("./pelis.json", this.data);
        return cargaDePeli2.then(() => {
          return true;
        });
      }
    });
    return cargaDePelis;
  }
}
export { PelisCollection, Peli };
