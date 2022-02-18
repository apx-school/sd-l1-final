import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class SearchOptions {
  title?: any;
  tag?: string;
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json: Peli[]) => {
      return json;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      return pelis.find((peli) => peli.id === id);
    });
  }
  search(options: SearchOptions): Promise<Peli[]> {
    if (options.title && options.tag) {
      return this.getAll().then((pelis) => {
        return pelis.filter(
          (peli) =>
            peli.title.includes(options.title) &&
            peli.tags.includes(options.tag)
        );
      });
    } else if (options.title) {
      return this.searchBy("title", options.title);
    } else if (options.tag) {
      return this.searchBy("tags", options.tag);
    }
  }
  searchBy(searchByOption: "title" | "tags", param: string): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      return pelis.filter((peli) => peli[searchByOption].includes(param));
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(() => {
            return true;
          });
        });
      }
    });
  }
}
export { PelisCollection, Peli, SearchOptions };
