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
        return i;
      });

      if (options.title && options.tag) {
        return arrayPelis.filter((peliEncontrada) => {
          return (
            peliEncontrada.title.includes(options.title) &&
            peliEncontrada.tags.includes(options.tag)
          );
        });
      } else if (options.tag) {
        return arrayPelis.filter((i) => {
          return i.tags.includes(options.tag);
        });
      } else if (options.title) {
        return arrayPelis.filter((peliEncontrada) => {
          return peliEncontrada.title.includes(options.title);
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log("La pelicula con id:", peliExistente.id, "ya existe");
        return false;
      } else {
        this.arrayPelis.push(peli);
        const data = this.arrayPelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then((peli) => {
          console.log("Pelicula agregada correctamente");
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
