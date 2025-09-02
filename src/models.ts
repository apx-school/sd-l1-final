import * as jsonfile from "jsonfile";
import * as path from "path";

// El siguiente import no se usa pero es necesario
import "./pelis.json";
const pelisPath = path.resolve(__dirname, "./pelis.json");
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll(); // Trae todas las pelis

    return options
      ? lista.filter((p) => {
          const tieneTag = options.tag ? p.tags.includes(options.tag) : true;
          const tieneTitulo =
            options.title && p.title ? p.title.includes(options.title) : true;
          return tieneTag && tieneTitulo;
        })
      : lista;
  }
  obtenerPelis(): Promise<Peli[]> {
    return jsonfile
      .readFile(pelisPath)

      .then((res) => {
        console.log("Contenido leído:", res);

        return Array.isArray(res) ? res : JSON.parse(res.toString());
      })

      .catch((error) => {
        console.error("Error al leer pelis.json:", error);

        throw error;
      });
  }
  getAll(): Promise<Peli[]> {
    return this.obtenerPelis();
  }
  async add(peli: Peli): Promise<boolean> {
    try {
      await this.getById(peli.id);

      return false;
    } catch (error) {
      const listadoPelis = await this.obtenerPelis();
      listadoPelis.push(peli);
      await jsonfile.writeFile(pelisPath, listadoPelis);
      return true;
    }
  }

  async getById(id: number): Promise<Peli> {
    const lista = await this.obtenerPelis();
    const peli = lista.find((p) => p.id === id);
    if (!peli) {
      throw new Error(`Peli con ID ${id} no encontrada`);
    }
    return peli;
  }
}

export { PelisCollection, Peli };
