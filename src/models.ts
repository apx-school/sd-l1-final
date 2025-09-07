import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const listaPelis = await jsonfile.readFile("./src/pelis.json");
    return listaPelis;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExiste = await this.getById(peli.id);
    if (peliExiste) {
      return false;
    } else {
      const listaPelis = await this.getAll();
      listaPelis.push(peli);
      await jsonfile.writeFile("./src/pelis.json", listaPelis);
      return true;
    }
  }

  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    const peliEncontrada = pelis.find((p) => p.id === id);
    return peliEncontrada || null;
  }

  async search(options: SearchOptions) {
    const listaPelis = await this.getAll();
    const listaFiltrada = listaPelis.filter((p) => {
      let coincide = true; // Asumimos que coincide
      if (options.tag) {
        coincide = coincide && p.tags.some((tag) => tag === options.tag);
      }
      if (options.title) {
        coincide =
          coincide &&
          p.title.toLowerCase().includes(options.title.toLowerCase());
      }
      return coincide; // Devolvemos si coincide con ambas condiciones
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli, SearchOptions };

//Pruebas en el modelo directamente
/* const listadoPelis = new PelisCollection();
async function mostrarPelis() {
  const pelis = await listadoPelis.getAll();
  console.log(pelis);
}
mostrarPelis(); */
