import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];

  getAll(): Promise<any> {
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
      if (options.title && options.tag) {
        return peliculas.filter((x) => {
          return (
            x.title.includes(options.title) && x.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return peliculas.filter((x) => {
          return x.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((x) => {
          return x.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.peliculas.push(peli);
        const data = this.peliculas;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
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
