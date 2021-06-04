import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile("pelis.json").then((p) => {
      // la respuesta de la promesa
      return [p];
    });
  }
  getById(id: number) {
    return this.getAll().then((productos) => {
      const producto = productos.find((p) => {
        return p.id == id;
      });
      return producto;
    });
  }

  search(options: any) {
    if (options.title) {
      return this.getAll().then((productos) => {
        const resultado = productos.filter((p) => {
          return p.title.includes(options.title);
        });
        return resultado;
      });
    } else if (options.tag) {
      return this.getAll().then((productos) => {
        const resultado = productos.filter((p) => {
          return p.tags.includes(options.tag);
        });
        return resultado;
      });
    }
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = { peli };
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
