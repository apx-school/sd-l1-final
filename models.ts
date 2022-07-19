import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json");
  }

  async getById(id: number): Promise<Peli> {
    let pelis = await this.getAll();
    return pelis.find((peli) => peli.id === id);
  }

  async search(options: any) {
    let pelis = await this.getAll();

    if (options.title) {
      pelis = pelis.filter((peli) =>
        peli.title
          .toLowerCase()
          .includes(options.title.toString().toLowerCase())
      );
    }

    if (options.tag) {
      pelis = pelis.filter((peli) =>
        peli.tags.reduce((acc, tag) => {
          return (
            acc || tag.toLowerCase() == options.tag.toString().toLowerCase()
          );
        }, false)
      );
    }

    return pelis;
  }

  async add(peli: Peli) {
    if (await this.getById(peli.id)) {
      return false;
    } else {
      let pelis = await this.getAll();
      pelis.push(peli);
      return jsonfile
        .writeFile(__dirname + "/pelis.json", pelis)
        .then(() => true)
        .catch(() => {
          console.log("error de escritura");
          return false;
        });
    }
  }
}
export { PelisCollection, Peli };