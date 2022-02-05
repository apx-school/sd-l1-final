import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    return promesa.then((respuesta) => {
      return respuesta;
    });
  }

  async search(options: any): Promise<any> {
    if (options.title && options.tag) {
      const coleccionCompleta = await this.getAll();
      return coleccionCompleta.filter((p) => {
        return p.title.includes(options.title) && p.tags.includes(options.tag);
      });
    }

    if (options.title) {
      const coleccionCompleta = await this.getAll();
      return coleccionCompleta.filter((p) => {
        return p.title.includes(options.title);
      });
    }

    if (options.tag) {
      const coleccionCompleta = this.getAll();
      return (await coleccionCompleta).filter((p) => {
        return p.tags.includes(options.tag);
      });
    }
  }

  getById(id: number): Promise<any> {
    const promesa = this.getAll();
    return promesa.then((respuesta) => {
      return respuesta.find((p) => {
        return p.id == id;
      });
    });
  }

  async add(peli: Peli): Promise<any> {
    const peliEncontrada = await this.getById(peli.id);
    if (peliEncontrada) {
      return false;
    } else {
      const coleccionCompleta = await this.getAll();
      coleccionCompleta.push(peli);
      await jsonfile.writeFile("./pelis.json", coleccionCompleta);
      return true;
    }
  }
}
export { PelisCollection, Peli };
