import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
  year: number;
  rating: number;
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((listaPelis) => {
      return listaPelis;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((listaPelis) => {
      return listaPelis.find((item) => {
        return item.id == id;
      });
    });
  }
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((listaPelis) => {
      if (options.title) {
        return listaPelis.filter((item) => {
          return item.title.includes(options.title);
        });
      }
      if (options.tag) {
        return listaPelis.filter((item) => {
          return item.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((respuesta) => {
      if (respuesta) {
        return false;
      } else {
        this.getAll().then((lista) => {
          lista.push(peli);
          return jsonfile.writeFile("./pelis.json", lista).then(() => {
            return true;
          });
        });
        return true;
      }
    });
  }
}
export { PelisCollection, Peli };

// pruebas
// const obj = new Peli();
// obj.id = 40;
// obj.title = "titulo";
// obj.year = 2000;
// const temp = new PelisCollection();
// temp.search({tag: "crimen"}).then((resultado) => {
//   console.log(resultado);
// });
