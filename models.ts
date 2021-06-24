import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      this.data = peliculas;
      return peliculas;
    });
  };

  getById(id:number):Promise<Peli> {
    return this.getAll().then((peliculas) => {
      const resultado = peliculas.find((item) => {
        return item.id == id;
      })
      return resultado;
    })
  }

  search(options:any) {
    return this.getAll().then((peliculas) => {
      if(options.title && options.tag) {
        return peliculas.filter((item) => {
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        })
      } else if(options.title) {
        return peliculas.filter((item) => {
          return item.title.includes(options.includes);
        })
      } else if(options.tag) {
        return peliculas.filter((item) => {
          return item.tags.includes(options.tag);
        })
      }
    })
  }

  add(peli:Peli):Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if(peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const data = this.data;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        })
      }
    })
    return promesaUno;
  }
}

export { PelisCollection, Peli };
