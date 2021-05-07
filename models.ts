import * as jsonfile from "jsonfile";
import { includes } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis2.json")
      .then((p) => {
        return p;
      });
  }
  getById(id: number): Promise<Peli>{
    return jsonfile.readFile("./pelis2.json")
      .then((p) => {
        return p.find((c) => c.id == id)
      })
  }
  search(options: any): Promise<Peli[]>{
    if (options.title && options.tag) {
      return jsonfile.readFile("./pelis2.json")
        .then((p) => {
          var resp;
          resp = p.filter((c) => includes(c.title, options.title))
          return resp = resp.filter((c) => includes(c.tags, options.tag))
        })
    }
    else if (options.title){
      return jsonfile.readFile("./pelis2.json")
        .then((p) => {
          return p.filter((c) => includes(c.title, options.title))
        });
    }
    else if (options.tag){
      return jsonfile.readFile("./pelis2.json")
        .then((p) => {
          return p.filter((c) => includes(c.tags, options.tag))
        });
    }
  }
  add(peli: Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = jsonfile.readFile("./pelis2.json");
        data.then((d) => {
          const data = d.concat(peli);
          const promesaDos = jsonfile.writeFile("./pelis2.json", data)
            .then(() => {
            return true;
            });
            return promesaDos;
        });
        return true;
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };