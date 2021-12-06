import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getPelis() {
    return jsonfile.readFile("./pelis.json");
  }
  getAll(): Promise<Peli[]> {
    return this.getPelis().then((r) => {
      return r;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getPelis().then((peli) => {
      return peli.find((p) => {
        return p.id == id;
      });
    });
  }
  search(options: any): Promise<any> {
    return this.getPelis().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((pelis) => {
          return (
            pelis.title.includes(options.title) &&
            pelis.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return peliculas.filter((pelis) => {
          return pelis.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((pelis) => {
          return pelis.tags.includes(options.tag);
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getPelis().then((p) => {
          p.push(peli);
          return jsonfile.writeFile("./pelis.json", p);
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
