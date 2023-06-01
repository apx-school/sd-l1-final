import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((p) => {
      return p;
    });
  }

  async getById(id: number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((data) => {
          data.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
  }

  async search(options) {
    const lista = await this.getAll();

    const listraFiltrada = lista.filter(function (p) {
      if (options.tag && options.title) {
        return p.tags.includes(options.tag) && p.title.includes(options.title);
      }
      if (options.tag) {
        return p.tags.includes(options.tag);
      }
      if (options.title) {
        return p.title.includes(options.title);
      }
    });

    return listraFiltrada;
  }
}

export { PelisCollection, Peli };
