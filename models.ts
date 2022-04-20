import { Console } from "console";
import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    const archivo = "./pelis.json";
    return jsonfile.readFile(archivo).then((respuesta) => {
      return respuesta;
    });
  }
  getById(id: number): Promise<Peli> {
    const respuesta = this.getAll().then((pelis) => {
      const resultado = pelis.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
    return respuesta;
  }
  async search(options: any): Promise<any> {
    const pelis = await this.getAll();
    if (options.tag && options.title) {
      return pelis.filter((peli) => {
        const filtradoPorTags = peli.tags.find(
          (r) => r == options.tag && peli.title.includes(options.title)
        );
        return filtradoPorTags;
      });
    } else if (options.title) {
      const resultado = pelis.filter((peli) => {
        return peli.title.includes(options.title);
      });

      return resultado;
    } else if (options.tag) {
      return pelis.filter((peli) => {
        const filtradoPorTags = peli.tags.find((r) => r == options.tag);
        return filtradoPorTags;
      });
    } else return pelis;
  }
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then(async (peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = await this.getAll();
        data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
