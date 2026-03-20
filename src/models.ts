import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // Guardamos la ruta en una constante para no repetirnos
  private readonly filePath = "./src/pelis.json";

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.filePath);
  }

  // Corregido: Agregamos | undefined al retorno
  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id === id);
  }

  async search(options: any): Promise<Peli[]> {
  const pelis = await this.getAll();
  return pelis.filter((peli) => {
    let cumple = true;
    if (options.title) {
      console.log(`Buscando título: ${options.title}, en: ${peli.title}`);
      cumple = cumple && peli.title.toLowerCase().includes(options.title.toLowerCase());
    }
    if (options.tag) {
      console.log(`Buscando tag: ${options.tag}, en: ${peli.tags}`);
      cumple = cumple && peli.tags.includes(options.tag);
    }
    return cumple;
  });
}

  async add(peli: Peli): Promise<boolean> {
    // Optimización: Leemos una sola vez
    const pelis = await this.getAll();
    const existe = pelis.find(p => p.id === peli.id);
    if (existe) {
      return false;
    } else {
      pelis.push(peli);
      return jsonfile.writeFile(this.filePath, pelis).then(() => true);
    }
  }
}

export { PelisCollection, Peli };