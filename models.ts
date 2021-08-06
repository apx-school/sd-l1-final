import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peli: Peli[];

  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((peli) => {
      return peli;
    });
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      const result = pelis.find((pel) => {
        return pel.id == id;
      });
      return result;
    });
  }

  search(options: any) {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((p) => {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tag)
          );
        });
      } else {
        console.log("MOVIE NOT FOUND");
      }

      if (options.title) {
        return pelis.filter((p) => {
          return p.title.includes(options.title);
        });
      } else {
        console.log("MOVIE NOT FOUND");
      }
      if (options.tag) {
        return pelis.filter((p) => {
          return p.tags.includes(options.tag);
        });
      } else {
        console.log("MOVIE NOT FOUND");
      }
    });
  }

  add(peli: Peli): Promise<Boolean> {
    return this.getById(peli.id).then((peliExists) => {
      if (peliExists) {
        console.log("THIS MOVIE ALREADY EXISTS");
        return false;
      } else
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          console.log("MOVIE ADDED TO FILE");
          return jsonfile.writeFile("./pelis.json", pelis).then(() => {
            return true;
          });
        });
    });
  }
}

export { PelisCollection, Peli };
