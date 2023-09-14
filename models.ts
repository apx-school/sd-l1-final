import * as jsonfile from "jsonfile";

type Peli = {
  id: number;
  title: string;
  tags: string[];
};

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json");
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      return pelis.find((peli) => peli.id == id);
    });
  }

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((peli) => {
          return (
            peli.title.includes(options.title) &&
            peli.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return pelis.filter((peli) => peli.title.includes(options.title));
      } else if (options.tag) {
        return pelis.filter((peli) => peli.tags.includes(options.tag));
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getAll().then((pelis) => {
      const existe = pelis.find((p) => p.id == peli.id);
      if (existe) {
        return false;
      } else {
        pelis.push(peli);
        return jsonfile.writeFile("./pelis.json", pelis).then(() => {
          return true;
        });
      }
    });
  }
}

export { PelisCollection, Peli };
