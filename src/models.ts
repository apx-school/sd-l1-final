import * as path from "path";
import * as jsonfile from "jsonfile";

// Ruta absoluta al pelis.json en el directorio actual de ejecución (cwd)
const filePath = path.resolve(process.cwd(), "src", "pelis.json");


class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  data: Peli[] = [];

  async load() {
    try {
      this.data = await jsonfile.readFile(filePath);
    } catch (err) {
      console.error("Error al leer pelis.json:", err);
      this.data = [];
    }
  }

  async getAll(): Promise<Peli[]> {
    await this.load();
    return this.data;
  }

  async add(peli: Peli): Promise<boolean> {
    await this.load();
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    }
    this.data.push(peli);
    await jsonfile.writeFile(filePath, this.data, { spaces: 2 });
    return true;
  }

  async getById(id: number): Promise<Peli | null> {
    await this.load();
    const encontrada = this.data.find((p) => p.id === id);
    return encontrada || null;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    if (!options.title && !options.tag) return lista;

    return lista.filter((p) => {
      const cumpleTitle = options.title
        ? p.title.toLowerCase().includes(options.title.toLowerCase())
        : true;
      const cumpleTag = options.tag
        ? p.tags.some((t) =>
            t.toLowerCase().includes(options.tag.toLowerCase())
          )
        : true;

      return cumpleTitle && cumpleTag;
    });
  }
}

export { Peli, PelisCollection };
