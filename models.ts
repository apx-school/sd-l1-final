import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => {
        return p.id == id;
      });
    });
  }

  search(options: any) {
    if (options.title) {
      return this.getAll().then((pelis) => {
        return pelis.filter((p) => {
          return p.title.includes(options.title);
        });
      });
    } else if (options.tag) {
      return this.getAll().then((pelis) => {
        return pelis.filter((p) => {
          return p.tags.includes(options.tag);
        });
      });
    }
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((data) => {
          data.push(peli);
          return jsonfile.writeFile("./pelis.json", data);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
