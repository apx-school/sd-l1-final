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
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.data = json;
      return json;
    });
  }
  getById(id: number) {
    return this.getAll().then((res) => {
      return res.find((item) => item.id == id);
    });
  }
  search(options: any) {
    return this.getAll().then((res) => {
      if (options.title && options.tag) {
        return res.filter(
          (item) =>
            item.title.includes(options.title) &&
            item.tags.includes(options.tag)
        );
      }
      if (options.title) {
        return res.filter((item) => item.title.includes(options.title));
      }
      if (options.tag) {
        return res.filter((item) => item.tags.includes(options.tag));
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
