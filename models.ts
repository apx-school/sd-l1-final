import * as jsonfile from "jsonfile";
import * as _ from "lodash";
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      return (this.data = res);
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      const resp = pelis.find((res) => {
        return res.id == id;
      });
      return resp;
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
      } else {
      }
      if (options["tag"]) {
        return pelis.filter((i) => _.includes(i.tags, options["tag"]));
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const primerRespuesta = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const segundaRespuesta = jsonfile.writeFile("./pelis.json", this.data);
        return segundaRespuesta.then(() => {
          return true;
        });
      }
    });

    return primerRespuesta;
  }
}
export { PelisCollection, Peli };
