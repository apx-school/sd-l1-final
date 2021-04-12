import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    let all = jsonfile.readFile("./pelis.json").then((x) => x);

    return all;
  }

  getById(id: number) {
    let encontrarId = this.getAll().then((x) => x.find((i) => i.id == id));
    return encontrarId;
  }

  search(options: any) {
    let buscar = this.getAll();

    if (options.title) {
      let encontrarTitle = buscar.then((x) =>
        x.filter((x) => x.title.includes(options.title))
      );
      buscar = encontrarTitle;
    }

    if (options.tag) {
      let encontrarTag = buscar.then((x) =>
        x.filter((x) => x.tags.includes(options.tag))
      );
      buscar = encontrarTag;
    }

    return buscar;
  }

  add(peli: Peli) {
    let addData = this.getAll();
    addData.then((x) => x.push(peli));
    addData.then((x) => jsonfile.writeFile("./pelis.json", x));
    addData.then((x) => x);

    return addData;
  }
}

export { PelisCollection, Peli };
