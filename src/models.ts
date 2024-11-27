import * as jsonfile from "jsonfile";

type SearchOptions = { title?: string; tag?: string };

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  async add(peli: Peli): Promise<boolean> {
    try {
      this.data = await this.getAll();
      const peliExistente = await this.getById(peli.id);
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        await jsonfile.writeFile("./pelis.json", this.data);
        return true;
      }
    } catch (error) {
      console.log("No se pudo agregar la película.");
      return false;
    }
  }

  async getAll(): Promise<Peli[]> {
    try {
      this.data = await jsonfile.readFile("./pelis.json");
      return this.data;
    } catch (error) {
      console.log("Error en la lectura de datos", error);
      return [];
    }
  }
  async getById(id: number) {
    const listado = await this.getAll();
    const peliEncontrada = listado.find((p) => p.id === id);
    return peliEncontrada;
  }
  async search(options: SearchOptions) {
    const listado = await this.getAll();
    const listaFiltrada = listado.filter((p) => {
      let esteVa = true;
      if (options.tag) {
        esteVa = esteVa && p.tags.includes(options.tag);
      }
      if (options.title) {
        esteVa =
          esteVa && p.title.toLowerCase().includes(options.title.toLowerCase());
      }
      return esteVa;
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
