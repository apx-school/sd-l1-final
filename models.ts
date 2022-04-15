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
  }
  //
  getById(id: number): Promise<any> {
    return this.getAll().then((res) => {
      return res.find((i) => {
        return i.id == id;
      });
    });
  }
  //
  search(options: any): Promise<any> {
    return this.getAll().then((res) => {
      if (options.title && options.tag) {
        return res.filter((i) => {
          return (
            i.title.includes(options.title) && i.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return res.filter((i) => {
          return i.title.includes(options.title);
        });
      } else if (options.tag) {
        return res.filter((i) => {
          return i.tags.includes(options.tag);
        });
      } else {
        return res;
      }
    });
  }
  //
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((res) => {
          const data = res;
          res.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
