import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      return res;
    });
  }

  add(peli: Peli): Promise<boolean> {
    var pelis: Promise<Peli[]>;

    var existePeli: Promise<boolean> = this.getById(peli.id).then((res) => {
      if (res) {
        return true;
      } else {
        pelis = this.getAll().then((res) => {
          res.push(peli);
          return res;
        });
        return false;
      }
    });

    var guardarPeli: Promise<boolean> = existePeli.then((res) => {
      if (!res) {
        return pelis.then((res) =>
          jsonfile
            .writeFile("./pelis.json", res)
            .then(() => true)
            .catch(() => false)
        );
      } else {
        return false;
      }
    });

    return guardarPeli;
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((res) => {
      return res.find((x) => x.id == id);
    });
  }

  async search(option: { title?: string; tag?: string }): Promise<Peli[]> {
    var pelisFiltradas: Peli[] = await this.getAll();
    if (option.title) {
      pelisFiltradas = pelisFiltradas.filter((x) => {
        return x.title.includes(option.title);
      });
    }

    if (option.tag) {
      pelisFiltradas = pelisFiltradas.filter((x) => {
        return x.tags.includes(option.tag);
      });
    }

    return pelisFiltradas;
  }
}

export { PelisCollection, Peli };
