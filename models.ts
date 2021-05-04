import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.data = json;
      return json;
    });
  }
  getById(id: number) {
    return this.getAll().then((pelis) => {
      return pelis.find((peli) => {
        return peli.id == id;
      });
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

  search(options: any) {
    const promesa = this.getAll().then((p) => {
      if (options.title && options.tag) {
        return p.filter(
          (r) => r.title.includes(options.title) && r.tags.includes(options.tag)
        );
      }
      if (options.title) {
        return p.filter((r) => r.title.includes(options.title));
      } else if (options.tag) {
        return p.filter((r) => r.tags.includes(options.tag));
      }
    });
    return promesa;
  }
}

export { PelisCollection, Peli };
