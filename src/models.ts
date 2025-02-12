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
  async getAll(): Promise<Peli[]> {
    try {
      return await jsonfile.readFile("./pelis.json");
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id); // Cambié esto para usar await
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = await this.getAll(); // Obtener todas las películas
        data.push(peli); // Agregar la nueva película
        await jsonfile.writeFile("./pelis.json", data); // Asegúrate de esperar a que se escriba el archivo
        return true; // Devuelve true después de escribir
      }
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false; // Devuelve false en caso de error
    }
  }

  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    return pelis.find(peli => peli.id === id) || null; // Devuelve la película o null si no existe
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll(); // Obtener todas las películas

    const listaFiltrada = lista.filter((p) => {
      let esteVa = false; // Variable para determinar si la película pasa el filtro

      if (options.tag) {
        // Lógica de tags
        esteVa = p.tags.includes(options.tag); // Verifica si el tag está en la lista de tags de la película
      }

      if (options.title) {
        // Lógica de title
        esteVa = esteVa || p.title.includes(options.title); // Verifica si el título incluye el string buscado
      }

      return esteVa; // Devuelve true si pasa el filtro
    });

    return listaFiltrada; // Devuelve la lista filtrada
  }
}

export { PelisCollection, Peli };
