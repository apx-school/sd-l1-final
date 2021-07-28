import * as jsonfile from "jsonfile";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  arrayPelis: Peli[];
  getAll(): Promise<Peli[]> {
    const todasLasPelis = jsonfile
      .readFile("./pelis.json")
      .then((resultado) => {
        return (this.arrayPelis = resultado);
      });
    return todasLasPelis;
  }
  getById(id: number) {
    return this.getAll().then((peliId) => {
      const peliculaEncontrada = peliId.find((peliculaId) => {
        return peliculaId.id == id;
      });
      return peliculaEncontrada;
    });
  }
  search(options: any) {
    if (options.search && options.tag) {
      return this.getAll().then((peliTagYSerch) => {
        const parametrosEncontrados = peliTagYSerch.filter((peliEncontrada) => {
          return (
            peliEncontrada.title.includes(options.search) &&
            peliEncontrada.tags.includes(options.tag)
          );
        });

        return parametrosEncontrados;
      });
    } else if (options.search) {
      return this.getAll().then((peliSerch) => {
        const parametroEncontrado = peliSerch.filter((peliEncontrada) => {
          return peliEncontrada.title.includes(options.search);
        });
        return parametroEncontrado;
      });
    } else if (options.tag) {
      return this.getAll().then((peliTag) => {
        const parametroTagEncontrado = peliTag.filter((peliEncontrada) => {
          return peliEncontrada.tags.includes(options.tag);
        });
        return parametroTagEncontrado;
      });
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.arrayPelis.push(peli);
        const data = this.arrayPelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then((peli) => {
          console.log("la pelicula se agrego correctamente");
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
