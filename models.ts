import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }
  async getById(id:number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find(peli => {
      return peli.id == id;
    })
  }
  async search(options?:any): Promise<Peli[]> {
    const pelis = await this.getAll();
    if (options.title){
      return pelis.filter(peli => {
        return peli.title.includes(options.title);
      });
    }
    if (options.tags){
      return pelis.filter(peli => {
        return peli.tags.includes(options.tags);
      });
    }
  }
  async add(peli: Peli): Promise<boolean> {
    const encontrado = await this.getById(peli.id);
    if (encontrado) {
      return false;
    }
    else {
      const pelis = await this.getAll();
      pelis.push(peli);
      await jsonfile.writeFile('./pelis.json', pelis);
      return true;   
    }
  }
}

export { PelisCollection, Peli }


