import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = {
  tag?: string;
  title?: string | number;
};

class PelisCollection {
  data: Peli[] = [];
  load() {
    const promesa = jsonfile.readFile(__dirname + "/pelis.json");
    const json = promesa;
    return json;
  }
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      return res;
    });
  }
  async getById(id: number): Promise<Peli> {
    const peliculas = await this.getAll();
    const pelicula = peliculas.find((peli) => peli.id === id);

    return pelicula;
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return jsonfile.readFile(__dirname + "/pelis.json").then((data) => {
          data.push(peli);
          return jsonfile
            .writeFile(__dirname + "/pelis.json", data)
            .then(() => {
              return true;
            });
        });
      }
    });
    return promesaUno;
  }
  async search(options: SearchOptions): Promise<any> {
    const lista = await this.getAll();
    if (options.tag && options.title) {
      return lista.filter((peli) => {
        return (
          peli.tags.includes(options.tag) &&
          peli.title.includes(options.title.toString())
        );
      });
    }
    if (options.title) {
      return lista.filter((peli) => {
        return peli.title.includes(options.title.toString());
      });
    }
    if (options.tag) {
      return lista.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    }
  }
}
export { PelisCollection, Peli };
// const probando = new PelisCollection();
// probando.getById(2).then((res) => console.log(res));
// probando.search({ title: "El diario de Noa" }).then((res) => console.log(res));

// const unaPeli = {
//   id: 4,
//   title: "probando",
//   tags: ["Drama", "Romance"],
// };
// probando.add(unaPeli);
// console.log(probando.getData());
// probando.getAll().then((res) => console.log(res));
// probando.getById(1).then((res) => console.log(res));
