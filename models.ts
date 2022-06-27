import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("pelis.json");
    // la respuesta de la promesa
  }
  async getById(id: number): Promise<any> {
    const allPelis = await this.getAll();
    const resultado = allPelis.find((peli) => {
      return peli.id == id;
    });
    return resultado;
  }
  async search(options: any): Promise<any> {
    const allPelis = await this.getAll();
    if (options.title) {
      const resultado = allPelis.filter((element) => {
        return element.title.includes(options.title);
      });
      return resultado;
    }
    if (options.tag) {
      const resultado = allPelis.filter((element) => {
        var contieneElTag: boolean = false;
        const arrayDeTags = element.tags;
        arrayDeTags.forEach((i) => {
          if (i.includes(options.tag)) {
            contieneElTag = true;
            return;
          }
        });
        if (contieneElTag) {
          return element;
        }
      });
      return resultado;
    }
  }
  async add(peli: Peli): Promise<boolean> {
    const yaExiste = await this.getById(peli.id);
    if (yaExiste) {
      return false;
    } else {
      const data = await this.getAll();
      data.push(peli);
      await jsonfile.writeFile("./pelis.json", data);
      return true;
    }
  }
}
export { PelisCollection, Peli };
