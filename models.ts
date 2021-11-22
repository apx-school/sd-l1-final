import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('./pelis.json').then((peliculas) => {
      return peliculas;
    });
  }

  getById(id: number) {
    return this.getAll().then((peliculas) => {
      const resultado = peliculas.find((pelicula) => {
        return pelicula.id == id;
      });
      return resultado;
    });
  }

  search(options: any) {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((p) => {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return peliculas.filter((p) => {
          return p.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((p) => {
          return p.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((peliculas) => {
          const data = peliculas;
          peliculas.push(peli);
          const promesaDos = jsonfile.writeFile('./pelis.json', data);
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
