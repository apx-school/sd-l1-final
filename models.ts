import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas
    })
  };

  getById(id: number) {
    return this.getAll().then((pelicula) => {
      const encontrado = pelicula.find((p) => {
        return p.id == id
      })
      return encontrado
    });
  };

  search(options: any) {
    if (options.title) {
      return this.getAll().then((x) => {
        return x.filter((y) => {
          return y.title.includes(options.title)
        })
      });
    } else if (options.tag) {
      return this.getAll().then((w) => {
        return w.filter((z) => {
          return z.tags.includes(options.tag)
        })
      });
    };
  };

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((x) => {
          x.push(peli)
          return jsonfile.writeFile("./pelis.json", x);
        })

        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
};

export { PelisCollection, Peli };
