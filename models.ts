import * as jsonfile from "jsonfile";
import { title } from "node:process";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data = jsonfile.readFile("./pelis.json");

  getAll(): Promise<Peli[]> {
    let all = this.data.then((x) => x);
    return all;
  }

  getById(id: number) {
    let encontrarId = this.data.then((x) => x.find((i) => i.id == id));
    return encontrarId;
  }

  search(options: any) {
    //Funciones correctamente, falta aplicar la libreria
    if (options.includes("title")) {
      let encontrarTitle = this.data.then((x) =>
        x.filter((i) => i.title.includes(options))
      );

      return encontrarTitle;
    }

    //Tag
    if (options.includes("tag")) {
      let encontrarTag = this.data.then((x) =>
        x.filter((i) => i.tags.includes(options))
      );

      return encontrarTag;
    }
  }

  add(peli: Peli) {
    let addData = jsonfile.writeFile("./pelis.json", peli);
    addData.then((x) => x);
    return addData;
  }
}

const nuevaPeli = {
  id: 5699,
  title: "Ted",
  tags: ["accion", "comedia"],
};

var classINST = new PelisCollection();
classINST.add(nuevaPeli).then((x) => {
  console.log(x);
});

export { PelisCollection, Peli };
