import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];

  async getAll(): Promise<Peli[]> {
    let arrayDePelis = await jsonfile.readFile("./pelis.json");
    this.pelis = arrayDePelis;
    return this.pelis;
  }
  async getById(id: number): Promise<any> {
    await this.getAll();
    return this.pelis.find((p) => p.id == id);
  }

  async search(option: any): Promise<any> {
    var pelisEncontadas = await this.getAll();
    if (option.title) {
      var filterResponse = pelisEncontadas.filter((film) => {
        return film.title.includes(option.title);
      });
      pelisEncontadas = filterResponse;
    }
    if (option.tag) {
      var filterResponse = pelisEncontadas.filter((film) => {
        return film.tags.map((tag) => tag).includes(option.tag);
      });
      pelisEncontadas = filterResponse;
    }
    return pelisEncontadas;
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data

        return this.getAll().then((peliculas) => {
          peliculas.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
