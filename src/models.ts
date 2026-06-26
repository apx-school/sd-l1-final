import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

async function readPelis() {
  try {
    const pelis = await jsonfile.readFile("src/pelis.json");
    console.log(pelis);
  } catch (error) {
    console.error("Error al leer el archivo:", error);
  }
}

//readPelis();

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      return await jsonfile.readFile("src/pelis.json");
    } catch (error) {
      console.error("Error al leer el archivo en getAll:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  }
  async getById(id: number): Promise<Peli | undefined> {
    try {
      const pelis = await this.getAll();
      return pelis.find((p) => p.id === id);
    } catch (error) {
      console.error("Error en getById:", error);
      return undefined;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll(); // Obtiene todas las películas
    return pelis.filter((p) => {
      const matchesTitle = options.title
        ? p.title.includes(options.title)
        : true;
      const matchesTag = options.tag ? p.tags.includes(options.tag) : true;
      return matchesTitle && matchesTag; // Filtra por título y/o tag
    });
  }

  async add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((p) => {
      if (p) {
        return false; // Si la película ya existe, devuelve false
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli); // Agrega la nueva película al array
          return jsonfile.writeFile("src/pelis.json", pelis).then(() => {
            return true; // Devuelve true si se guardó correctamente
          });
        });
      }
    });
  }
}

type SearchOptions = { title?: string; tag?: string };

export { PelisCollection, Peli, SearchOptions };
