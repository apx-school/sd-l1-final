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

  async getById(id: number): Promise<Peli> {
    const encontrado = await this.getAll();
    return encontrado.find((peli) => {
      return peli.id == id;
    });
  }

  async search(options: any): Promise<any> {
    const objetoPelis = await this.getAll();

    if (options.title && options.tag) {
      const encontrar = objetoPelis.filter((titlePeli) => {
        return (
          titlePeli.title.includes(options.title) &&
          titlePeli.tags.includes(options.tag)
        );
      });
      return encontrar;
    } else if (options.title) {
      const tituloEncontrado = objetoPelis.filter((titlepeli) => {
        return titlepeli.title.includes(options.title);
      });
      return tituloEncontrado;
    } else if (options.tag) {
      const tagEncontrado = objetoPelis.find((tagPeli) => {
        return tagPeli.tags.includes(options.tag);
      });
      return tagEncontrado;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id);
    if (promesaUno) {
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
