import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll() {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }
  getById(id: any) {
    const buscado = this.getAll().then((json) =>
      json.find((peli) => peli.id == id)
    );
    return buscado;
  }
  search(options: any) {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        let resultado = [];
        pelis.forEach((peli) => {
          if (peli.tags.includes(options.tag.toLowerCase())) {
            resultado.push(peli);
          }
        });
        return resultado.filter((peli) => {
          let nombreEnMinuscula = peli.title.toLowerCase();
          return nombreEnMinuscula.includes(options.title);
        });
      } else if (options.title) {
        return pelis.filter((peli) => {
          let nombreEnMinuscula = peli.title.toLowerCase();
          return nombreEnMinuscula.includes(options.title);
        });
      } else if (options.tag) {
        return pelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((todas) => {
          todas.push(peli);
          return jsonfile.writeFile("./pelis.json", todas);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });
     return promesaUno;
  }
}
export { PelisCollection, Peli };