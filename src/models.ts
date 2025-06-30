import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras

class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json").then((peliculas) => {
      return peliculas;
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false; // ID ya existe, no se agrega
      } else {
        return this.getAll().then((peliculas) => {
          // Agregás la nueva película al array
          peliculas.push(peli);

          // Escribís el array actualizado en el archivo
          return jsonfile.writeFile("./src/pelis.json", peliculas).then(() => {
            return true; // Se agregó correctamente
          });
        });
      }
    });
  }

  getAllSync(): Peli[] {
    const peliculas = jsonfile.readFileSync("./src/pelis.json"); // Lee el archivo de forma síncrona
    return peliculas; // Devuelve el array de películas
  }

  getById(id: number): Promise<Peli | null> {
    return this.getAll().then((peliculas) => {
      const peli = peliculas.find((p) => p.id === id);
      return peli ? peli : null; // Devuelve la película encontrada o null si no existe
    });
  }
  search(options:SearchOptions):Promise<Peli[]> {
    return this.getAll().then((peliculas) => {
      return peliculas.filter((peli) => {
        // Filtra por título
        const matchesTitle = options.title ? peli.title.toLowerCase().includes(options.title.toLowerCase()) : true;
        // Filtra por tags
        const matchesTag = options.tag ? peli.tags.map(t => t.toLowerCase()).includes(options.tag.toLowerCase()) : true;

        // Devuelve true si coincide con ambos criterios
        return matchesTitle && matchesTag;
      });
    });
  }
}
export { PelisCollection, Peli };
