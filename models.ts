import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((p) => {
      // la respuesta de la promesa
      return (this.pelis = p);
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((productos) => {
      const producto = productos.find((p) => {
        return p.id == id;
      });
      return producto;
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((pelis) => {
      var collection = pelis;
      if (options.title) {
        collection = collection.filter((p) => {
          return p.title
            .toLowerCase()
            .includes(options.title.toString().toLowerCase());
        });
      }
      if (options.tag) {
        collection = collection.filter((p) => {
          return p.tags.includes(options.tag);
        });
      }
      if (options.title && options.tag) {
        collection = collection.filter((p) => {
          return (
            p.title.toLowerCase().includes(options.title) &&
            p.tags.includes(options.tag)
          );
        });
      }
      return collection;
    });
  }

  add(pelicula: Peli): Promise<boolean> {
    const promesaUno = this.getById(pelicula.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        this.pelis.push(pelicula);
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
