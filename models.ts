import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  data: Peli[] = [];

  // Devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas en el archivo JSON.
  async getAll(): Promise<Peli[]> {
    try {
      const data = await jsonfile.readFile(__dirname + "/pelis.json");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    // Recibe una Peli y la guarda en el archivo.
    try {
      const peliExistente = await this.getById(peli.id);

      // No debe admitir agregar IDs repetidos.
      if (peliExistente) {
        return false;
      } else {
        const peliList = await this.getAll();
        peliList.push(peli);
        await jsonfile.writeFile(__dirname + "/pelis.json", peliList);
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  // Devuelve la peli con el id que se le pase por parámetro.
  async getById(id: number): Promise<Peli> {
    try {
      const allPelis = await this.getAll();
      const foundPeli = allPelis.find((peli) => {
        return peli.id === id;
      });
      return foundPeli;
    } catch (error) {
      throw error;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    try {
      const lista = await this.getAll();
      const listraFiltrada = lista.filter(
        (peli) =>
          peli.tags.includes(options.tag) || peli.title.includes(options.title)
      );
      return listraFiltrada;
    } catch (error) {
      throw error;
    }
  }
}

export { PelisCollection, Peli };
