import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      return res;
    });
    // la respuesta de la promesa
  }

  getById(id: number) {
    return this.getAll().then((res) => {
      return res.find((i) => {
        return i.id == id;
      });
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((res) => {
      if (options.title && options.tag) {
        return res.filter((i) => {
          return (
            i.title.includes(options.title) && i.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return res.filter((i) => i.title.includes(options.title));
      } else if (options.tag) {
        return res.filter((i) => i.tags.includes(options.tag));
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExiste) => {
      if (peliExiste) {
        return false;
      } else {
        const promesaDos = this.getAll().then((res) => {
          res.push(peli);
          return jsonfile.writeFileSync("./pelis.json", res);
        });
        return promesaDos.then((res) => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
