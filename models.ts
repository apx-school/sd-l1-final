import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
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
  async search(options: any): Promise<Peli[]> {
    const pelis = await this.getAll();
    if (options.title) {
      const pelisFiltradas = pelis.filter((pelis) =>
        pelis.title.includes(options.title)
      );
      return pelisFiltradas;
    }
    if (options.tag) {
      const pelisFiltradas = pelis.filter((pelis) =>
        pelis.tags.includes(options.tags)
      );
      return pelisFiltradas;
    }
    if (options.tag && options.title) {
      const pelisFiltradasPorTagyTitle = pelis.filter((pelis) => {
        return (
          pelis.title.includes(options.title) &&
          pelis.tags.includes(options.tags)
        );
      });
      return pelisFiltradasPorTagyTitle;
    }
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
