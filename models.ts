import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return (this.data = pelis);
    });
  }
  getById(id: number): Promise<any> {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => {
        return p.id == id;
      });
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((pelis) => {
      return pelis.filter((p) => {
        if (options.title && options.tag) {
          return (
            p.title.toLowerCase().includes(options.title) &&
            p.tags.includes(options.tag)
          );
        } else if (options.title) {
          return p.title.toLowerCase().includes(options.title);
        } else if (options.tag) {
          return p.tags.includes(options.tag);
        } else {
          return this.getAll();
        }
      });
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };
