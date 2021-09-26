import * as jsonfile from "jsonfile";
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];
  getAll() {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }
  getById(id: number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((iden) => {
        return iden.id == id;
      });
      return resultado;
    });
  }
  search(options: any) {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((peliculas) => {
          return (
            peliculas.title.includes(options.title) &&
            peliculas.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return peliculas.filter((peliculas) => {
          return peliculas.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((peliculas) => {
          return peliculas.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.pelis.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json");

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
