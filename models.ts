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
      //creé este nuevo array porque "p" me daba problemas con el include en option.title
      const arrayPelis = p.filter((i) => {
        return i;
      });
      //console.log(arrayPelis);
      if (options.title && options.tag) {
        //el include funciona bien acá
        return arrayPelis.filter((peliEncontrada) => {
          return (
            peliEncontrada.title.includes(options.title) &&
            peliEncontrada.tags.includes(options.tag)
          );
        });
      } else if (options.tag) {
        //options.tag me genera el mismo problema de include que me generaba title antes de crear la const arrayPelis
        return arrayPelis.filter((i) => {
          return i.tags.includes(options.tag);
        });
      } else if (options.title) {
        //el include funciona bien acá
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
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };

//const peli = new PelisCollection();
//peli.search({ tag: "Drama" }).then((p) => {
//return console.log(p);
//});
