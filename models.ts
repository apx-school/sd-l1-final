import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      // la respuesta de la promesa
      return json;
    });
  }
  getById(id: number) {
    return this.getAll().then((collection) => {
      const peliEncontrada = collection.find((p) => {
        return p.id == id;
      });
      return peliEncontrada;
    });
  }
  search(options: any) {
    return this.getAll().then((collection) => {
      if (options.title && options.tag) {
        const resultadoTitle = collection.filter((films) =>
          films.title.includes(options.title.toLowerCase())
        );
        return resultadoTitle.filter((film) =>
          film.tags.find((a) => a == options.tag.toLowerCase())
        );
      } else if (options.title) {
        const resultadoTitle = collection.filter((films) =>
          films.title.includes(options.title.toLowerCase())
        );
        return resultadoTitle;
      } else if (options.tag) {
        const resultadoTags = collection.filter((films) =>
          films.tags.find((b) => b == options.tag.toLowerCase())
        );
        return resultadoTags;
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((collection) => {
          var data = collection;
          collection.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };

const nuevaPelisCollection = new PelisCollection();
