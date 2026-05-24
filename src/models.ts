import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";

class Peli {
  id!: number;
  title!: string;
  tags!: string[];
}

// Tipos de opciones de búsqueda
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  // 1- getAll()
  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile("./src/pelis.json")
      .then((pelis: Peli[]) => {
        return pelis;
      })
      .catch((err: any) => {
        console.error("Error al leer el archivo de películas:", err);
        return []; // Si falla, devolvemos un array vacío
      });
  }

  // 2- getById
  getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((pelis) => {
      const peliEncontrada = pelis.find((p) => {
        return p.id === id;
      });
      return peliEncontrada;
    });
  }

  // 3- Add peli
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);

          const promesaDos = jsonfile.writeFile("./src/pelis.json", pelis);

          return promesaDos
            .then(() => {
              return true;
            })
            .catch((err: any) => {
              console.error("Error al escribir el archivo de películas:", err);
              return false; // Si no se pudo guardar, devolvemos false.
            });
        });
      }
    });
    return promesaUno;
  }

  // 4- el método search
  search(options: SearchOptions): Promise<Peli[]> {
    return this.getAll().then((lista) => {
      const listaFiltrada = lista.filter((p) => {
        let esteVa = true;

        if (options.title) {
          if (!p.title.toLowerCase().includes(options.title.toLowerCase())) {
            esteVa = false;
          }
        }

        if (options.tag) {
          // .some() recorre los tags de la película uno por uno
          const tieneElTag = p.tags.some((tagDeLaPeli) => {
            return tagDeLaPeli.toLowerCase() === options.tag!.toLowerCase();
          });

          if (!tieneElTag) {
            esteVa = false;
          }
        }

        return esteVa;
      });

      return listaFiltrada;
    });
  }
}

export { PelisCollection, Peli };
