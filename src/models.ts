import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

function getPeliById(id: number, data) {
  const res = data.find((i) => i.id === id);
  if (res) {
    return { true: true, item: res };
  } else {
    return false;
  }
}

class PelisCollection {
  data: Peli[];
  constructor() {}
  async load(): Promise<Peli[]> {
    const res = await jsonfile.readFile("src/pelis.json");
    this.data = res;
    return res;
  }
  async add(peli: Peli): Promise<boolean> {
    const check = getPeliById(peli.id, this.data);
    if (!check) {
      this.data.push(peli);
      return await jsonfile
        .writeFile("src/pelis.json", this.data)
        .then(() => true);
    } else {
      console.error("Error al agregar pelicula ya existente a al colección!");
      return false;
    }
  }
  getAll() {
    return this.data;
  }
  getById(id: number) {
    const check = getPeliById(id, this.data);
    if (check) {
      return check.item;
    } else {
      return false;
    }
  }
  search(options: SearchOptions) {
    if (options.title && options.tag) {
      return this.data.filter(
        (p: Peli) =>
          p.title.toLowerCase().includes(options.title.toLowerCase()) &&
          p.tags.includes(options.tag.toLowerCase())
      );
    } else if (options.title) {
      return this.data.filter((p: Peli) =>
        p.title.toLowerCase().includes(options.title.toLowerCase())
      );
    } else {
      return this.data.filter((p: Peli) =>
        p.tags.includes(options.tag.toLowerCase())
      );
    }
  }
}

// async function main() {
//   const newP = new PelisCollection();
//   await newP.load();
//   // console.log("Data desp después del load:", newP.data); (Working)
//   // newP.add({ id: 4, title: "pelicula mock", tags: ["acción", "aventura"] }); (Working)
//   const getById = newP.getById(1); /*  (working) */
//   console.log("getById :", getById);

//   // const search = newP.search({ tag: "suspenso" }); (working)
//   // console.log("Search :", search);
// }
// main();

export { PelisCollection, Peli };
