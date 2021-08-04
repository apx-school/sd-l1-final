import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
  year: number;
}

class PelisCollection {
  peli: Peli[];

  getAll(): Promise<Peli[]> {
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

  getByYear(year: number) {
    return this.getAll().then((pelis) => {
      if (year) {
        return pelis.filter((pel) => {
          return pel.year == year;
        });
      } else {
        return "YEAR NOT FOUND";
      }
    });
  }

  search(options: any) {
    return this.getAll().then((pelis) => {
      if (options.title && options.tags) {
        //<--ACA ARRIBA HABIA PUESTO OPTIONS.SEARCH Y .TAG
        return pelis.filter((p) => {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tags)
          );
        });
      } else if (options.title) {
        return pelis.filter((p) => {
          return p.title.includes(options.title);
        });
      } else if (options.tags) {
        return pelis.filter((p) => {
          return p.tags.includes(options.tags);
        });
      } else if (options.year) {
        return pelis.filter((p) => {
          return p.year == options.year;
        });
      }
    });
  }

  add(peli: Peli): Promise<Boolean> {
    const firstPromise = this.getById(peli.id).then((peliExists) => {
      if (peliExists) {
        return false;
      } else {
        const secondPromise = this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis);
        });
        return secondPromise.then(() => {
          return true;
        });
      }
    });
    return firstPromise;
  }
}

export { PelisCollection, Peli };

//CONSOLE.LOGS

/* const obj = new PelisCollection();
obj.getAll().then((resolve) => {
  console.log("SOY GETALL", resolve);
});

obj.getById(7).then((resolve) => {
  console.log("soy get by id", resolve);
});

obj.getByYear(1930).then((resolve) => {
  console.log("SOY GET BY YEAR", resolve);
});

obj.search({ title: "anillo" }).then((resolve) => {
  console.log("SOY SEARCH", resolve);
});

obj
  .add({ id: 30, title: "Batman", tags: ["pep"], year: 1990 })
  .then((resolve) => {
    console.log("soy add", resolve);
  });
 */
//METODO YEAR NO IMPRIME
