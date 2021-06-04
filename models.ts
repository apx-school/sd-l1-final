import * as jsonfile from "jsonfile";
import * as find from "lodash/find";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll(): Promise<any> {
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
      var jsonGuardado = json;
      if (options.title) {
        jsonGuardado = jsonGuardado.filter((obj) => {
          return obj.title.toLowerCase().includes(options.title);
        });
      }
      if (options.tag) {
        jsonGuardado = jsonGuardado.filter((obj) => {
          return obj.tags.includes(options.tag);
        });
      }
      return jsonGuardado;
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
const objeto = new PelisCollection();
objeto.search({ tag: "rr" }).then((obj) => {
  console.log(obj);
});
export { Peli, PelisCollection };
