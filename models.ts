import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => json);
  }

  getById(id: number) {
    return this.getAll().then((listaPelis) =>
      listaPelis.find((peli) => peli.id == id)
    );
  }

  search(options: any) {
    return this.getAll().then((listaPelis) => {
      if (options.hasOwnProperty("title") && options.hasOwnProperty("tag")) {
        let filtrado = listaPelis.filter((peli) => {
          return peli.title.toLowerCase().includes(options.title.toLowerCase());
        });
        return filtrado.filter((peli) => {
          return peli.tags.includes(options.tag.toLowerCase());
        });
      } else if (options.hasOwnProperty("tag")) {
        return listaPelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      } else if (options.hasOwnProperty("title")) {
        return listaPelis.filter((peli) => {
          return peli.title.toLowerCase().includes(options.title.toLowerCase());
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((data) => {
          data.push(peli);
          jsonfile.writeFile("./pelis.json", data);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
//TEST
// function main() {
//   const collect = new PelisCollection();
//   let array = "algo";
//   collect.search({ title: "z" }).then((x) => console.log(x));
//   console.log(Array.isArray(array) ? "Es un array" : "No es un array");
// }
// main();

export { PelisCollection, Peli };
/*
          let res = peli.tags.includes(options.tag);
          console.log("TAGS: " + options.tag);
          console.log("Lo incluye?\n" + res);
          return res;
*/
