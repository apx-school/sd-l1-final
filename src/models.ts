import * as jsonfile from 'jsonfile';

type Peli = {
  id: number;
  title: string;
  tags: string[];
};

class PelisCollection {
  private filePath = './pelis.json';

  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.filePath);
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find(peli => peli.id === id);
  }

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter(peli => {
      const matchesTitle = options.title ? peli.title.includes(options.title) : true;
      const matchesTag = options.tag ? peli.tags.includes(options.tag) : true;
      return matchesTitle && matchesTag;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    const exists = await this.getById(peli.id);
    if (exists) return false;
    const pelis = await this.getAll();
    pelis.push(peli);
    await jsonfile.writeFile(this.filePath, pelis);
    return true;
  }
}

export { PelisCollection, Peli };
