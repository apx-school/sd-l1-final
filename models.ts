import * as jsonfile from "jsonfile";
import * as startsWith from "lodash/startsWith";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((allJSON) => {
      this.data = allJSON;
      return allJSON;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((json) => {
      return json.find((e) => e.id == id);
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }

  search(params: any): Promise<Peli[]> {
    return this.getAll().then((json) => {
      let result: Peli[] = [];
      json.map((e) => {
        if (startsWith(e.title, params.title) || e.tags.includes(params.tag)) {
          result.push(e);
        }
      });
      return result;
    });
  }
}
export { PelisCollection, Peli };
