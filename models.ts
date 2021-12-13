//funcionando

import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  coleccion: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return (this.coleccion = pelis);
    });
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      const peliHallada = pelis.find((e) => {
        return e.id == id;
      });
      return peliHallada;
    });
  }

  search(options: any) {
    /* if (option.title) {
      return this.getAll().then((peli) => {
        let pelisHalladas = peli.filter((e) => {
          return e.title.includes(option.title);
        });
        return pelisHalladas;
      });
    } else {
      if (option.tags) {
        return this.getAll().then((peli) => {
          const hallado = peli.filter((e) => {
            return e.tags.find((r) => r == option.tags);
          });
          return hallado;
        });
      }
    } */
    return this.getAll().then((peliculas) => {
      return peliculas.filter((p) => {
        if (options.title && options.tag) {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tag)
          );
        } else if (options.title) {
          return p.title.includes(options.title);
        } else if (options.tag) {
          return p.tags.includes(options.tag);
        }
      });
    });
  }

  add(pelicula: Peli): Promise<boolean> {
    //toma una pelicula como parametro y devuelve una promesa de tipo boolean
    const promesa1 = this.getById(pelicula.id).then((peliExistente) => {
      if (peliExistente) {
        return false; //osea si encuentra una peli con el mismo id devuelve false
      } else {
        var data = jsonfile.readFileSync("./pelis.json");
        data.push(pelicula);

        return jsonfile.writeFile("./pelis.json", data).then(() => {
          return true;
        });
      }
    });
    return promesa1;
  }
}
export { PelisCollection, Peli };

/*  const biblio = new PelisCollection();
const laPromesa = biblio.search({tag:"Classic"}).then((e) => {
    console.log(e);
  });
  */
