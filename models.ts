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
    const peliExiste = await this.getById(peli.id);
    //si el id existe...
    if (peliExiste) {
      return false;
    }
    const todasPelis = await this.getAll();
    todasPelis.push(peli);
    const json = JSON.stringify(todasPelis);
    await writeFile(this.filePath, json);
    return true;
  }
}

const col = new PelisCollection();
col.getById(4321865).then((res) => console.log(res));
export { PelisCollection, Peli };
