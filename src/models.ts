//Importo a traves de "fs/promises" por que no me descarga jsonfile
import { readFile, writeFile } from "fs/promises";

import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      const datos = await readFile("pelis.json", "utf-8");
      if (!datos) return []; // si está vacío, devuelvo array vacío

      const pelis: Peli[] = JSON.parse(datos);
      return pelis;
    } catch (e) {
      console.error("Error al leer pelis.json:", e);
      return []; // nunca devuelvo undefined
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id === id);
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const resultado = lista.filter((p) => {
      const coincideConTitulo = options.title
        ? p.title.includes(options.title)
        : true;
      const coincideConTags = options.tag ? p.tags.includes(options.tag) : true;

      return coincideConTitulo && coincideConTags;
    });

    console.log("Resultado de búsqueda:", resultado); // Agregar esta línea para depurar
    return resultado;
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);
      if (peliExistente) {
        return false; //Si ya existe el id no se agrega
      }

      const pelis = await this.getAll();
      pelis.push(peli);

      await writeFile("pelis.json", JSON.stringify(pelis, null, 2)); //Agrego nueva peli

      return true;
    } catch (error) {
      console.error("Error al agregar la pelicula:", error);
      return false;
    }
  }
}
export { PelisCollection, Peli };
