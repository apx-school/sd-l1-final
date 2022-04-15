import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('./pelis.json').then((pelis) => {
      // la respuesta de la promesa
      this.pelis = pelis;
      return pelis;
    });
  }
  getById(id: number) {
    return this.getAll().then((pelis) => pelis.find((peli) => peli.id === id));
  }
  search(options: any) {
    let resultado;
    if (options.title && options.tag) {
      resultado = this.getAll().then((pelis) =>
        pelis.filter((peli) => {
          let bandera = false;
          for (let i = 0; i < peli.tags.length; i++) {
            if (peli.tags[i] === options.tag) {
              bandera = true;
              break;
            }
          }
          if (peli.title.includes(options.title) && bandera) {
            return peli;
          }
        })
      );
    } else if (options.title) {
      resultado = this.getAll().then((pelis) =>
        pelis.filter((peli) => peli.title.includes(options.title))
      );
    } else if (options.tag) {
      resultado = this.getAll().then((pelis) =>
        pelis.filter((peli) => {
          for (let i = 0; i < peli.tags.length; i++) {
            if (peli.tags[i] === options.tag) {
              return peli;
            }
          }
        })
      );
    }
    return resultado;
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const promesaDos = this.getAll().then((peliculas) => {
          peliculas.push(peli);
          return jsonfile.writeFile('./pelis.json', peliculas);
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
