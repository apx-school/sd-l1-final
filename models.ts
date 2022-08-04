import * as jsonfile from "jsonfile";

// no es buena práctica importar todo
import * as _ from "lodash";

class Peli {
  id: number;
  title: string;
  rating?: number;
  tags: string[];
  starring?: string[];
  year?: number;
  length?: number;
  streamingService?: string;
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((allPelis) => {
      return allPelis;
    });
  }

  getById(searchedId: number): Promise<Peli> {
    return jsonfile.readFile("./pelis.json").then((allPelis) => {
      return _.find(allPelis, { id: searchedId });
    });
  }

  search(options: any): Promise<Peli[] | Peli> {
    return jsonfile.readFile("./pelis.json").then((allPelis) => {
      // options.title = algo; options.tag = algo
      if (options.title && !options.tag) {
        // devolver todas las películas con ese string en su title
        return _.filter(allPelis, (peli) => {
          if (peli.title.includes(options.title)) {
            return peli;
          }
        });
      }
      if (!options.title && options.tag) {
        // devolver todas las películas con ese tag en sus tags
        return _.filter(allPelis, (peli) => {
          if (peli.tags.includes(options.tag)) {
            return peli;
          }
        });
      }
      if (options.title && options.tag) {
        // devolver todas las películas con ese string en el title y el tag en sus tags
        const pelisSearchedByTitle = _.filter(allPelis, (peli) => {
          if (peli.title.includes(options.title)) {
            return peli;
          }
        });
        const pelisSearchedByTitleAndTag = _.filter(
          pelisSearchedByTitle,
          (peli) => {
            if (peli.tags.includes(options.tag)) {
              return peli;
            }
          }
        );
        return pelisSearchedByTitleAndTag;
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    // si existe la película, la promesa devuelve falso
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) return false;
      else {
        const addNewPeli = async () => {
          let allPelis = await jsonfile.readFile("./pelis.json");
          allPelis.push(peli);
          await jsonfile.writeFile("./pelis.json", allPelis);
          return true;
        };
        return addNewPeli().then((res) => res);
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };

// const testPelisCollection = new PelisCollection();
// testPelisCollection.getAll().then((res) => console.log(res));
// testPelisCollection.getById(5).then((res) => console.log(res));
// testPelisCollection.search({ title: "Volver" }).then((res) => console.log(res));
// testPelisCollection
//   .search({ tag: "argentina" })
//   .then((res) => console.log(res));
// testPelisCollection
//   .search({ title: "Hoy", tag: "argentina" })
//   .then((res) => console.log(res));

// testPelisCollection
//   .add({ id: 1345, title: "Sarasa cósmica", tags: ["test"] })
//   .then((res) => console.log(res));
