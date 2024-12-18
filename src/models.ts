import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta


interface Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = []; // Inicializa data como un array vacío

  // Método que carga el archivo json de películas
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => {
      this.data = data;
      return this.data; // Devuelve la data leída
    });
  }

  // Método que obtiene una película según su id
  async getById(id: number): Promise<Peli | undefined> {
    const peliculas = await this.getAll();
    const peli = peliculas.find((peli) => peli.id === id);
    
    if (!peli) {
      console.error(`Película con ID ${id} no encontrada.`);
    }
    
    return peli;
  }

  // Método que filtra películas según su título y sus tags
  search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      let tmp = pelis;
      if (options.title) {
        tmp = tmp.filter((i) => i.title.includes(options.title));
      }
      if (options.tag) {
        tmp = tmp.filter((i) => i.tags.includes(options.tag));
      }
      return tmp;
    });
  }

  // Método que agrega una película a data y luego lo guarda en el json
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false; // Si la película ya existe, devuelve false
      }
      this.data.push(peli); // Agrega la nueva película
      return jsonfile.writeFile("./pelis.json", this.data).then(() => true); // Guarda y devuelve true
    });
  }
}

export { PelisCollection, Peli };
