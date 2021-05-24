import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      return (this.data = json);
    });
  }
  getById(id: number): Promise<any> {
    return this.getAll().then((data) => {
      const resultado = data.find((i) => {
        i.id == id;
      });
      return resultado;
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((data) => {
      return data.filter((i) => {
        if (options.title) {
          return i.title.includes(options.title);
        } else if (options.tag) {
          return i.tags.includes(options.tag);
        } else if (options.title && options.tag) {
          return (
            i.title.includes(options.title) && i.tags.includes(options.tag)
          );
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
