import * as jsonfile from "jsonfile";
import * as find from "lodash/find";
import * as filter from "lodash/filter";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json");
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await jsonfile.readFile("./pelis.json");
    return find(pelis, (item: Peli) => item.id === id);
  }
  async search(options: any): Promise<Peli[]> {
    const pelis = await jsonfile.readFile("./pelis.json");
    if (options.title && options.tag)
      return filter(
        pelis,
        (item: Peli) =>
          item.title.includes(options.title) && item.tags.includes(options.tag)
      );
    if (options.title && !options.tag)
      return filter(pelis, (item: Peli) => item.title.includes(options.title));

    if (options.tag && !options.title)
      return filter(pelis, (item: Peli) => item.tags.includes(options.tag));
  }
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = jsonfile.readFile("./pelis.json");

        return promesaDos.then((response: Peli[]) => {
          const data = [...response, ...[peli]];
          const promesaTres = jsonfile.writeFile("./pelis.json", data);

          return promesaTres.then(() => {
            return true;
          });
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
