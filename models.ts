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
    return this.getAll().then((json: any) => {
      if (options.title && options.tag) {
        return json.filter((obj) => {
          return (
            obj.title.includes(options.title) && obj.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return json.filter((obj) => {
          return obj.title.includes(options.title);
        });
      } else if (options.tag) {
        return json.filter((obj) => {
          return obj.tags.includes(options.tag);
        });
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
          // var data = collection;
          collection.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", collection);
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
