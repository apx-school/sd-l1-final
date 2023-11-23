import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];

  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title || "";
    this.tags = tags || [];
  }
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  private filePath: string;

  constructor(filePath: string = "./pelis.json") {
    this.filePath = filePath;
  }

  private async readFile(): Promise<Peli[]> {
    try {
      const data = await jsonfile.readFile(this.filePath);
      return data || [];
    } catch (error: any) {
      console.error("Error reading file:", error.message);
      return [];
    }
  }

  private async writeFile(data: Peli[]): Promise<void> {
    try {
      await jsonfile.writeFile(this.filePath, data);
    } catch (error: any) {
      console.error("Error writing file:", error.message);
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.readFile();
    const peliExistente = pelis.find((p) => p.id === peli.id);

    if (peliExistente) {
      return false;
    }

    pelis.push(peli);
    await this.writeFile(pelis);
    return true;
  }

  async getAll(): Promise<Peli[]> {
    return this.readFile();
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.readFile();
    return pelis.find((p) => p.id === id);
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.readFile();
    return pelis.filter((p) => {
      let esteVa = true;
      if (options.tag && !p.tags.includes(options.tag)) {
        esteVa = false;
      }
      if (options.title && !p.title.includes(options.title)) {
        esteVa = false;
      }
      return esteVa;
    });
  }
}

export { PelisCollection, Peli, SearchOptions };
