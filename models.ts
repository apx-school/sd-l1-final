import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<any[]> {

    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return this.data = pelis;
    });
  }

  getById(id: number) {

    return this.getAll().then((pelis) => {
      return pelis.find((e) => e.id == id);
    });
  }

  search(options: any) {

    return this.getAll().then((pelis) => {

      let resultado = pelis;

      if (options.title && options.tag) {
        return resultado.filter((item) => {
          return item.title.toLocaleLowerCase().includes(options.title)
            && item.tags.includes(options.tag);
        });

      } else if (options.title) {
        resultado = pelis.filter((item) => {
          return item.title.toLocaleLowerCase().includes(options.title);
        });

      } else if (options.tag) {
        resultado = pelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
      }

      return resultado;
    });
  }

  add(peli: Peli): Promise<boolean> {

    return this.getById(peli.id).then((peliExistente) => {

      if (peliExistente) {
        return false;

      } else {
        this.data.push(peli);
        const data = this.data;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });
  }
}

export { PelisCollection, Peli };
