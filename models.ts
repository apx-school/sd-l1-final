import * as jsonfile from "jsonfile";
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      this.pelis = pelis;
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
        return peliculas.filter((peliss) => {
          return (
            peliss.title.includes(options.title) &&
            peliss.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return peliculas.filter((peliss) => {
          return peliss.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((peliss) => {
          return peliss.tags.includes(options.tag);
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
        const promesaDos = jsonfile.writeFile("./pelis.json", this.pelis);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
