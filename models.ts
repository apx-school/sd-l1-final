import { log } from "console";
import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  dato: any;

  async getAll(): Promise<Peli[]> {
    const res = await jsonfile.readFile(__dirname + "\\pelis.json");
    return res;
  }

  async getById(id: number): Promise<Peli> {
    const dato = await this.getAll();
    return dato.find((peli) => peli.id == id);
  }

  // Me estaba equivocando en el add
  //writeFile no concatena directamente como pensé

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id);
    if (promesaUno) {
      return false;
    } else {
      const pelis = await this.getAll();
      pelis.push(peli);
      // habria que mejorar la parte del error
      return jsonfile.writeFile("./pelis.json", pelis).then(() => {
        console.log("El archivo se escribió correctamente");
        return true;
      });
    }
  }

  async search(options?: SearchOptions): Promise<Peli[]> {
    const films = await this.getAll();

    return films.filter((element) => {
      // Si options.title está definido, verificar si la palabra clave está presente en el título
      const titleMatch = options?.title
        ? element.title.includes(options.title)
        : true;

      // Si options.tag está definido, verificar si la etiqueta está presente en las etiquetas de la película
      const tagMatch = options?.tag ? element.tags.includes(options.tag) : true;

      return titleMatch && tagMatch;
    });
  }
}

type SearchOptions = { title?: string; tag?: string };

// var prueba = new PelisCollection();

// (async () => {
//   prueba.getAll().then((res) => {
//     console.log(res);
//   });
// })();

// (async () => {
//   const res = await prueba.search({ title: "star", tag: "aventura" });
//   console.log(res);
// })();

export { PelisCollection, Peli, SearchOptions };
