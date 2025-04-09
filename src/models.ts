import * as jsonfile from "jsonfile";
import "./pelis.json";

const FILE_PATH = "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(FILE_PATH);
  }

  async getById(id: number): Promise<Peli | null> {
    const all = await this.getAll();
    const found = all.find((p) => p.id === id);
    return found || null;
  }

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const all = await this.getAll();
    let result = all;

    if (options.title) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(options.title.toLowerCase())
      );
    }

    if (options.tag) {
      result = result.filter((p) => p.tags.includes(options.tag));
    }

    return result;
  }

  async add(peli: Peli): Promise<boolean> {
    const all = await this.getAll();
    const exists = all.some((p) => p.id === peli.id);

    if (exists) return false;

    all.push(peli);
    await jsonfile.writeFile(FILE_PATH, all, { spaces: 2 });
    return true;
  }
}

export { PelisCollection, Peli };
