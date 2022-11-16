import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => json);
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((listaPelis) =>
      listaPelis.find((peli) => peli.id == id)
    );
  }

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((listaPelis) => {
      if (options.hasOwnProperty("title") && options.hasOwnProperty("tag")) {
        let filtrado = listaPelis.filter((peli) => {
          return peli.title.includes(options.title);
        });
        return filtrado.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      } else if (options.hasOwnProperty("tag")) {
        return listaPelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      } else if (options.hasOwnProperty("title")) {
        return listaPelis.filter((peli) => {
          return peli.title.includes(options.title);
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
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
}

export { PelisCollection, Peli };
