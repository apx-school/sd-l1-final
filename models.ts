import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  colecciondepeliculas: Peli;
  getAll(): Promise<Peli[]> {
    return jsonfile("/pelis.json").then((peliculas) => {
      // la respuesta de la promesa
      return [peliculas];
    });
  }
  getById(id: number): Promise<any> {
    return this.getAll().then((listaPelis) => {
      const devolucion = listaPelis.find((peliConId) => {
        return peliConId.id == id;
      });
      return devolucion;
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((listaPelis) => {
      if (options.title && options.tag) {
        return listaPelis.filter((peli) => {
          return (
            peli.title.includes(options.title) &&
            peli.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return listaPelis.filter((peli) => peli.title.includes(options.title));
      } else if (options.tag) {
        return listaPelis.filter((peli) => peli.tags.includes(options.tag));
      }
    });
  }
}

const coleccionPeliculas = new PelisCollection();
coleccionPeliculas.getAll().then((resultado) => {
  console.log(resultado);
});
export { PelisCollection, Peli };
