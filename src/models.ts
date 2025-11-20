 const jsonfile = require('jsonfile');

export interface Peli {
  id: number;
  title: string;
  tags: string[];
}

export class PelisCollection {
  private filePath = './pelis.json';

  async getAll(): Promise<Peli[]> {
    try {
      const pelis = await jsonfile.readFile(this.filePath);
      return pelis;
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  }

  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    const peli = pelis.find(p => p.id === id);
    return peli || null;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    }
    const pelis = await this.getAll();
    pelis.push(peli);
    await jsonfile.writeFile(this.filePath, pelis);
    return true;
  }
}
