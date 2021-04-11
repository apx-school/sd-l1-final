import * as jsonfile from "jsonfile";
import * as find from "lodash/find";
import * as includes from "lodash/includes";
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection extends Peli {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      return res;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((archivo) => {
      return find(archivo, { id: id });
    });
  }
  search(options: any) {
    return this.getAll().then((archivo) => {
      var pelisEncontradas = archivo;
      if (options.title) {
        pelisEncontradas = pelisEncontradas.filter((peli) => {
          return includes(
            peli.title.toLocaleLowerCase(),
            options.title.toLocaleLowerCase()
          );
        });
      }
      if (options.tag) {
        pelisEncontradas = pelisEncontradas.filter((peli) => {
          return peli.tags.find((tag) => {
            return tag == options.tag;
          });
        });
      }
      return pelisEncontradas;
    });
  }
  add(peli: Peli) {
    return this.getAll().then((archivo) => {
      const existe = find(archivo, { id: peli.id });
      if (!existe) {
        archivo.push(peli);
        jsonfile.writeFile("./pelis.json", archivo);
        return true;
      } else {
        return false;
      }
    });
  }
}
export { PelisCollection, Peli };
