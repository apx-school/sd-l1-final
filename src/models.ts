import jsonfile from "jsonfile";

export type Peli = {
  id: number;
  title: string;
  tags: string[];
};

export class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      const pelis: Peli[] = await jsonfile.readFile("./pelis.json");
      return pelis;
    } catch {
      return []; // Si no existe o está vacío
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const all = await this.getAll();
    if (all.find(p => p.id === peli.id)) {
      return false; // No se permite ID duplicado
    }
    all.push(peli);
    await jsonfile.writeFile("./pelis.json", all);
    return true;
  }

  async getById(id: number): Promise<Peli | undefined> {
    const all = await this.getAll();
    return all.find(p => p.id === id);
  }

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    let all = await this.getAll();
    if (options.title) {
      all = all.filter(p => p.title.includes(options.title!));
    }
    if (options.tag) {
      all = all.filter(p => p.tags.includes(options.tag!));
    }
    return all;
  }
}
