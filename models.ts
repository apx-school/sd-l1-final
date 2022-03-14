import { readFile, writeFile } from "fs/promises";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  rating?: number;
  tags: string[];
}

class PelisCollection {
  filePath: string = "./pelis.json";

  async getAll(): Promise<Peli[]> {
    const buffer = await readFile(this.filePath);
    const string = buffer.toString();
    return JSON.parse(string);
  }
  async getById(id: number): Promise<Peli> {
    const todasPelis: Peli[] = await this.getAll();
    return todasPelis.find((peli: Peli) => {
      return peli.id === id;
    });
  }
  //si tiene propieda title se busca por ese string en el titulo
  //si tiene tag debe devolver las que tengan ese string en los tag
  async search({ title, tag }: any): Promise<Peli[]> {
    let array = await this.getAll();
    console.log(array);
    if (title) {
      array = array.filter((p) => {
        const regularExpression = new RegExp(title, "i");
        return regularExpression.test(p.title);
      });
    }
    if (tag) {
      array = array.filter((p) => {
        return p.tags.includes(tag);
      });
    }
    return array;
  }

  //sin id repetido
  async add(peli: Peli): Promise<any> {
    const todasPelis = await this.getAll();

    //si se encuentra un id igual es que hay repetido entonces retorna false
    if (todasPelis.find((p) => p.id == peli.id)) {
      return false;
    }

    todasPelis.push(peli);
    const json = JSON.stringify(todasPelis);
    await writeFile(this.filePath, json);

    return true;
  }
}

export { PelisCollection, Peli };
