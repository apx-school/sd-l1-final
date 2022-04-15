import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];

  getAll(): Promise<any[]> {
    const pelis = jsonfile.readFile("./pelis.json").then((pelis) => {
      return (this.data = pelis);
    });
    return pelis;
  }

  getById(id: number) {
    const resolve = this.getAll().then((p) => {
      return p.find((i) => {
        return i.id == id;
      });
    });
    return resolve;
  }
  search(options: any) {
    return this.getAll().then((pelis) => {
      let respuesta = pelis;

      if (options.title && options.tag) {
        return respuesta.filter(
          (item) =>
            item.title.toLowerCase().includes(options.title) &&
            item.tags.includes(options.tag)
        );
      } else if (options.title) {
        respuesta = pelis.filter((i) =>
          i.title.toLowerCase().includes(options.title)
        );
      } else if (options.tag) {
        respuesta = pelis.filter((i) => i.tags.includes(options.tag));
      }
      return respuesta;
    });
  }

  add(peli: Peli) {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const data = this.data;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };
