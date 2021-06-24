import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((collection) => {
      this.peliculas = collection;
      return collection;
    });
  }
  getById(id: number) {
    return this.getAll().then((collection) => {
      const resultado = collection.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
  }
  search(options: any) {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tags) {
        let filtrandoPelisXtitle = peliculas.filter((p) => {
          return p.title.includes(options.title);
        });
        let filtrandoXtag = filtrandoPelisXtitle.filter((p) => {
          return p.tags.includes(options.tags);
        });
        return filtrandoXtag;
      } else if (options.tags) {
        let filtrandoXtag = peliculas.filter((p) => {
          return p.tags.includes(options.tags);
        });
        return filtrandoXtag;
      } else if (options.title) {
        let filtrandoPelisXtitle = peliculas.filter((p) => {
          return p.title.includes(options.title);
        });
        return filtrandoPelisXtitle;
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log(peliExistente);
        return false;
      } else {
        this.getAll().then((todasLasPelis) => {
          todasLasPelis.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", todasLasPelis);
          promesaDos.then(() => {
            return true;
          });
          return promesaDos;
        });
      }
      return true;
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
/*
const Prueba = new PelisCollection();

Prueba.getAll().then((col) => {
  console.log(col + "son todas las Pelis");
});

Prueba.getById(68).then((col) => {
  console.log(col + "la peli es esta");
});

const nuevaPeli = new Peli(95, "rapido y furioso5", ["accion"]);

Prueba.add(nuevaPeli).then((res) => {
  console.log(res);
});

Prueba.search({ tags: "aventura" }).then((res) => {
  console.log(res);
});
*/
