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
    return this.getAll().then((p) => {
      const arrayPelis = p.filter((i) => {
        return i.title;
      });

      if (options.title && options.tag) {
        return arrayPelis.filter((peliEncontrada) => {
          return (
            peliEncontrada.title.includes(options.title) &&
            peliEncontrada.tags.includes(options.tag)
          );
        });
      } else if (options.tag) {
        return p.filter((i) => {
          return i.tags.includes(options.tag);
        });
      } else if (options.title) {
        console.log("estoy entrando aca");
        return arrayPelis.filter((peliEncontrada) => {
          return peliEncontrada.title.includes(options.title);
        });
      }
    });
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
