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

  getById(id: number): Promise<Peli> {
    return this.getAll().then((peliculas) => {
      var peliBuscada = peliculas.find((peli) => peli.id == id);
      return peliBuscada;
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        const resultadoTitle = peliculas.filter((pelis) =>
          pelis.title.includes(options.title)
        );
        return resultadoTitle.filter((peli) =>
          peli.tags.find((t) => t == options.tag)
        );
      } else if (options.title) {
        const resultadoTitle = peliculas.filter((pelis) =>
          pelis.title.includes(options.title)
        );
        return resultadoTitle;
      } else if (options.tag) {
        const resultadoTags = peliculas.filter((pelis) =>
          pelis.tags.find((t) => t == options.tag)
        );
        return resultadoTags;
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

const x = new PelisCollection();
var options = { title: 'mpire' };
x.search(options).then((p) => console.log(p));
console.log('a');
export { PelisCollection, Peli };
