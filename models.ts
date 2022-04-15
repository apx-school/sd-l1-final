import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => {
      return (this.data = data);
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((data) => {
      return data.find((item) => {
        return item.id == id;
      });
    });
  }

  search(options: any) {
    return this.getAll().then((data) => {
      let resultado;
      if (options.title) {
        resultado = data.filter((item) => {
          return item.title.includes(options.title);
        });
      }
      if (options.tag) {
        resultado = data.filter((item) => {
          return item.tags.includes(options.tag);
        });
      }
      if (options.title && options.tag) {
        resultado = data.filter((item) => {
          return (
            item.title.includes(options.title) &&
            item.tags.includes(options.tag)
          );
        });
      }
      return resultado;
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        this.data.push(peli);
        const data = this.data;
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
