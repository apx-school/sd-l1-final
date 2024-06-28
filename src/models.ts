
import * as jsonfile from "jsonfile";
import "./pelis.json";

type SearchOptions = { title?: string; tag?: string };

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      const peli = pelis.find((peli) => {
        return peli.id === id;
      });
      return peli;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);

      if (peliExistente) {
        return false; 
      } else {
        let data = await this.getAll(); 
        peli.id = Number(peli.id);
        data.push(peli); 

        await jsonfile.writeFile("./pelis.json", data);

        return true; 
      }
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false; 
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    return lista.filter(pelicula => {
      let cumpleCondicion = true;

      if (options.tag && !pelicula.tags.includes(options.tag)) {
        cumpleCondicion = false;
      }

      if (options.title && !pelicula.title.toLowerCase().includes(options.title.toLowerCase())) {
        cumpleCondicion = false;
      }

      return cumpleCondicion;
    });
  }
}

export { PelisCollection, Peli };


