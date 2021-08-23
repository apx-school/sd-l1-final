import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      this.data = pelis;
      return pelis;
    });
  }

  getById(id: number): Promise<any> {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => {
        return p.id == id;
      });
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((pelis) => {
      var encontrado = pelis;
      if (options.title) {
        encontrado = encontrado.filter((p) => {
          return p.title.includes(options.title);
        });
      }
      if (options.tag) {
        encontrado = encontrado.filter((p) => {
          return p.tags.find((tag) => {
            return tag.includes(options.tag);
          });
        });
      }
      return encontrado;
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
}
export { PelisCollection, Peli };
