import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas;
    });
  }
  getById(id: number) {
    return this.getAll().then((peli) => {
      const resultado = peli.find((p) => {
        return p.id === id;
      });
      return resultado;
    });
  }

  search(options: any) {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((peli) => {
          return (
            peli.title.includes(options.title) &&
            peli.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return pelis.filter((peli) => {
          return peli.title.includes(options.title);
        });
      } else if (options.tag) {
        return pelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((pelicula) => {
      if (pelicula) {
        return false;
      }
      const promesaDos = this.getAll().then((peliculas) => {
        peliculas.push(peli);
        return jsonfile.writeFile("./pelis.json", peliculas);
      });
      return promesaDos.then(() => {
        return true;
      });
    });
    return promesaUno;
  }
}

export {PelisCollection, Peli};
