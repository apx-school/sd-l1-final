import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

  class PelisCollection {
    getAll() {
      return jsonfile.readFile(__dirname + "/pelis.json").then((res) => {
        return res;
      });
    }
    getById(id: number) {
      return this.getAll().then((pelis) => {
        return pelis.find((x) => x.id == id);
      });
    }
    search(options: any) {
      if (options.title && options.tag) {
        let aux;
        aux = this.getAll().then((res) => {
          return res.filter((x) => x.title.includes(options.title));
        });
        return aux.then((res) => {
          return res.filter(
            (x) => x.tags.filter((x) => x == options.tag) == options.tag
          );
        });
      } else if (options.title) {
        return this.getAll().then((res) => {
          return res.filter((x) => x.title.includes(options.title));
        });
      } else if (options.tag) {
        return this.getAll().then((res) => {
          return res.filter((x) => x.tags.includes(options.tag));
        });
      }
    }
    add(peli: Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          return this.getAll().then((pelis) => {
            pelis.push(peli);
            const promesaDos = jsonfile.writeFile(
              __dirname + "/pelis.json",
              pelis
            );
  
            return promesaDos.then(() => {
              return true;
            });
          });
        }
      });
  
      return promesaUno;
    }
  }
  
  export { PelisCollection, Peli };