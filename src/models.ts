import * as jsonfile from "jsonfile";
import * as path from 'path';

const filePath = path.resolve(__dirname, 'pelis.json');


type Peli = {
  id: number;
  title: string;
  tags: string[];
};

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  // Obtener todas las películas
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(filePath).then((pelis: Peli[]) => {
      return pelis;
    });
  }

  // Obtener una película por ID
  async getById(id: number): Promise<Peli | null> {
    try {
      const pelis = await this.getAll();
      return pelis.find((peli) => peli.id === id) || null;
    } catch (error) {
      console.error("Error al obtener la película por ID:", error);
      return null;
    }
  }

  // Agregar una nueva película
  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);
      if (peliExistente) {
        console.log("Error: Ya existe una película con el ID", peli.id);
        return false;
      }

      const pelis = await this.getAll();
      pelis.push(peli);

      await jsonfile.writeFile(filePath, pelis);
      console.log("Película agregada exitosamente", peli);
      return true;
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      let esteVa = false;

      if (options.tag && p.tags.includes(options.tag)) {
        esteVa = true;
      }

      if (options.title && p.title.includes(options.title)) {
        esteVa = true;
      }

      if (options.tag && options.title) {
        esteVa = p.tags.includes(options.tag) && p.title.includes(options.title);
      }

      return esteVa;
    });


    return listaFiltrada;
  }


}
export { PelisCollection, Peli };