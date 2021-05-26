import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((item) => {
      return (this.data = item);
    });
  }
  getById(id: number): Promise<any> {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((pelis) => {
      var resolve = pelis;
      if (options.title) {
        resolve = resolve.filter((peli) => {
          return peli.title.includes(options.title);
        });
      }
      if (options.tag) {
        resolve = resolve.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      }
      return resolve;
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
