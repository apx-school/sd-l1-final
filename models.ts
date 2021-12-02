import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis = jsonfile.readFile("./pelis.json");

  getAll(): Promise<Peli[]> {
    return this.pelis.then((res) => console.log(res));
  }
  getById(id: number): Promise<Peli> {
    return this.pelis.then((pelis) => {
      return pelis.find((i) => {
        return i.id == id;
      });
    });
    this.pelis.catch((err) => console.log(err));
  }

  search(options: any): Promise<any> {
    return this.pelis.then((peliculas) => {
      if (options.title && options.tags) {
        return peliculas.filter((pelis) => {
          return pelis.title.includes(options.title && options.tags);
        });
      } else if (options.title) {
        return peliculas.filter((pelis) => {
          return pelis.title.includes(options.title);
        });
      } else if (options.tags) {
        return peliculas.filter((pelis) => {
          return pelis.tags.includes(options.tags);
        });
      }
    });
    this.pelis.catch((err) => console.log(err));
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.pelis.then((p) => {
          p.push(peli);
          return jsonfile.writeFile("./pelis.json", peli);
        });

        return promesaDos.then((p) => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
