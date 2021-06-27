import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  getAll(): Promise<Peli[]> {
    const allPelis = jsonfile.readFile("./pelis.json").then((p) => {
      this.peliculas = p
      return p;
    }); return allPelis;
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((peli) => {
      return peli.find((p) => {
        return p.id == id;
      });
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((pelisList) => {
      if (options.title && options.tag) {
        return pelisList.filter((i) => {
          return i.title.includes(options.title) && i.tags.includes(options.tag);
        });
      }
      else if (options.title) {
        return pelisList.filter((i) => {
          return i.title.includes(options.title);
        });
      }
      else if (options.tag) {
        return pelisList.filter((i) => {
          return i.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<Boolean> {
    const promiseone = this.getById(peli.id).then((pe) => {
      if (pe) {
        console.log("Existe")
        return false;
      } else {
        this.peliculas.push(peli);
        const data = this.peliculas;
        const promiseTwo = jsonfile.writeFile("./pelis.json", data);

        return promiseTwo.then(() => {
          return true;
        })
      }
    })
    return promiseone;

  }
}
export { PelisCollection, Peli };

