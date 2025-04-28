import * as jsonfile from "jsonfile";
import "./pelis.json"; // Importa el archivo JSON para que TypeScript lo incluya

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  data: Peli[] = [];

  async load() {
    const file = "./pelis.json"; // Asegúrate de que la ruta sea correcta
    try {
      this.data = await jsonfile.readFile(file);
    } catch (err) {
      console.error("Error al cargar el archivo:", err);
    }
  }

  async getAll(): Promise<Peli[]> {
    await this.load();
    return this.data;
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false; // No se puede agregar si ya existe
      } else {
        // Agrega la película a la colección
        this.data.push(peli); // Agrega la nueva película a la colección
        return jsonfile.writeFile("./pelis.json", this.data).then(() => {
          return true; // Devuelve true si se agregó correctamente
        });
      }
    });

    return promesaUno; // Devuelve la promesa
  }

  async getById(id: number): Promise<Peli | null> {
    await this.load(); // Asegúrate de cargar los datos antes de buscar
    const idFind = this.data.find((idd) => idd.id === id);
    return idFind || null; // Devuelve la película o null si no se encuentra
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll(); // Carga todas las películas

    if (!options.title && !options.tag) {
      return lista; // Si no hay opciones de búsqueda, devuelve todas las películas
    }

    const listaFiltrada = lista.filter((p) => {
      let cumpleTitle = true;
      let cumpleTag = true;

      if (options.title) {
        cumpleTitle = p.title.toLowerCase().includes(options.title.toLowerCase());
      }

      if (options.tag) {
        const tagLower = options.tag.toLowerCase();
        cumpleTag = p.tags.some((t) => t.toLowerCase() === tagLower);
      }

      return cumpleTitle && cumpleTag; // Devuelve true si cumple ambos criterios
    });

    return listaFiltrada; // Devuelve la lista filtrada
  }
}

export { PelisCollection, Peli };
