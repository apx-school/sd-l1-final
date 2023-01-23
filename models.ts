import * as jsonfile from "jsonfile";
import { platform } from "process";

// TAG PARA EL FUTURO CERCANO: usar minimist o no,
// para hacer que la peli que se guarde con "add()"
// se guarde con mayusculas al principio

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  allPelis: Peli[] = [];

  async load() {
    this.allPelis = await this.getAll();
  }
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(__dirname + "/pelis.json");
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find((p) => {
      return p.id == id;
    });
  }
  async add(peli: Peli): Promise<boolean> {
    if (await this.getById(peli.id)) {
      //console.log("ERROR, ya hay una peli con ese id");

      return false;
    } else {
      await this.load();
      this.allPelis.push(peli);
      const writingFile = await jsonfile.writeFile(
        __dirname + "/pelis.json",
        this.allPelis
      );

      return true;
    }
  }
  async search() {}
}

export { PelisCollection, Peli };

const coll = new PelisCollection();

const mockPeli = { id: 12, title: "astros", tags: ["asd", "qwe"] };

coll.add(mockPeli).then((r) => {
  console.log(r);
});
