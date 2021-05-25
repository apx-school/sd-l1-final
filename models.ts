import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((datos) => {
      return (this.data = datos);
    });
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((i) => {
        return i.id == id;
      });
      return resultado;
    });
  }

  search(options: any) {
    // {"tag": 1, "title":"Peli 1"}
    return this.getAll().then((pelis) => {
      return pelis.filter((r) => {
        if (options.title) {
          return r.title.includes(options.title);
        } else if (options.tags) {
          return r.tags.includes(options.tags);
        } else if (options.title && options.tags)
          return (
            r.title.includes(options.title) && r.tags.includes(options.tags)
          );
      });
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
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

    return promesaUno;
  }
}

export { PelisCollection, Peli };
