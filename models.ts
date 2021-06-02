import * as jsonfile from "jsonfile";
import * as find from "lodash/find";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll() {
    const pelis = jsonfile.readFile("./pelis.json").then((json) => {
      // la respuesta de la promesa
      this.data = json;
      return json;
    });
    return pelis;
  }
  getById(id: number) {
    const pelisId = this.getAll().then((json) => {
      return find(json, function (obj) {
        return obj.id == id;
      });
    });
    return pelisId;
  }
  search(options: any) {
    return this.getAll().then((json) => {
      if (options.title) {
        return json.filter((obj) =>
          obj.title.toLowerCase().includes(options.title)
        );
      }

      if (options.tag) {
        return json.filter((obj) => obj.tags.includes(options.tag));
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        //magia
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}
/* const objeto = new PelisCollection();
objeto.getById(3).then((obj) => {
  console.log(obj);
}); */
export { Peli, PelisCollection };
