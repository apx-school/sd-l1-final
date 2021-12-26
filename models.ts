import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => { return pelis })
  }
  getById(id: number) {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => { return p.id == id })
    })
  }
  search(options: any): Promise<any> {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((p) => { return p.title.includes(options.title) && p.tags.includes(options.tag) })
      } else if (options.title) {
        return pelis.filter((p) => { return p.title.includes(options.title) })
      } else if (options.tag) {
        return pelis.filter((p) => { return p.tags.includes(options.tag) })
      }
    })
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          const data = pelis
          pelis.push(peli)
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => {
            return true;
          })
        })
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
