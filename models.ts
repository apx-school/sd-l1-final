import * as jsonfile from "jsonfile";
import * as _ from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((pelis) => {
      return pelis;
      // la respuesta de la promesa
      //return [];
    });
  }
  getById(id: number) {
    return this.getAll().then((pelis) => {
      return pelis.find((i) => i.id === id);
    });
  }
  search(options: any) {
    return this.getAll().then((pelis) => {
      if (options["tag"] && options["title"]) {
        const filterPorTag = pelis.filter((i) =>
          _.includes(i.tags, options["tag"])
        );
        return filterPorTag.filter((i) =>
          _.includes(i.title, options["title"])
        );
      }
      if (options["title"]) {
        return pelis.filter((i) => _.includes(i.title, options["title"]));
      }
      if (options["tag"]) {
        return pelis.filter((i) => _.includes(i.tags, options["tag"]));
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        //magia que agrega la pelicula a un objeto data
        const promesaAgregaPeliAData = this.getAll().then((pelis) => {
          let data: any;
          data = pelis;
          data.push(peli);
          return data;
        });
        return promesaAgregaPeliAData.then((data) => {
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => true);
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
