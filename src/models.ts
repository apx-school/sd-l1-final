import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((data) => {
      return data;
    });
  }

  getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((pelis) => {
      return pelis.find((peli) => peli.id == id);
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      }

      return this.getAll().then((pelis) => {
        pelis.push(peli);

        return jsonfile
          .writeFile(__dirname + "/pelis.json", pelis, { spaces: 2 })
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      });
    });
  }

  search(options: SearchOptions): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      return pelis.filter((peli) => {
        let esteVa = true;

        if (options.title) {
          esteVa =
            esteVa &&
            peli.title.toLowerCase().includes(options.title.toLowerCase());
        }

        if (options.tag) {
          esteVa = esteVa && peli.tags.includes(options.tag);
        }

        return esteVa;
      });
    });
  }
}

export { PelisCollection, Peli, SearchOptions };