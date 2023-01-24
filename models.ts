import { AnyTxtRecord } from "dns";
import * as jsonfile from "jsonfile";
import { platform, title } from "process";

// TAG PARA EL FUTURO CERCANO: usar minimist o no,
// para hacer que la peli que se guarde con "add()"
// se guarde con mayusculas al principio

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

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
  /*
  async search(options: SearchOptions): Promise<Peli[]> {
    await this.load();

    const toReturn = this.allPelis.filter((p) => {
      if (options.tag && !options.title) {
        return p.tags.includes(options.tag);
      }
      if (options.title && !options.tag) {
        return p.title.includes(options.title);
      }
      if (options.tag && options.title) {
        return p.tags.includes(options.tag) && p.title.includes(options.title);
      }
    });

    return toReturn;
  }
  */
  async search(options) {
    const lista = await this.getAll();

    const listraFiltrada = lista.filter((p) => {
      let esteVa = false;
      if (options.tag) {
        esteVa = p.tags.includes(options.tag);
      }
      if (options.title) {
        esteVa = p.title.includes(options.title);
      }
      return esteVa;
    });

    return listraFiltrada;
  }
}

export { PelisCollection, Peli };
/*
const coll = new PelisCollection();

const mockPeli = { id: 123, title: "astros", tags: ["asd", "qwe"] };
coll.add(mockPeli).then((r) => {
  console.log(r);
});

coll.search({ title: "Howls moving castle", tag: "Horror" }).then((r) => {
  console.log(r);
});
*/
