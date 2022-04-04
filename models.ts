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
  async search(options: any): Promise<Peli[]> {
    const pelis = await this.getAll();
    if (options.title != options.tag) {
      const pelisFiltradas = pelis.filter((pelis) =>
        pelis.title.includes(options.title)
      );
      return pelisFiltradas;
    } else if (options.tag != options.title) {
      return pelis.filter((item) => {
        const pelisfiltradasTags = item.tags.find((res) => {
          return res == options.tag;
        });
        return pelisfiltradasTags;
      });
    } else if (options.tag && options.title) {
      const pelisFiltradasPorTagyTitle = pelis.filter((pelis) => {
        return (
          pelis.title.includes(options.title) &&
          pelis.tags.includes(options.tag)
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
function main() {
  const pelis = new PelisCollection();

  pelis.getAll().then((peli) => {
    const respuesta = peli.filter((item) => {
      const pelisfiltradasTags = item.tags.find((res) => {
        return res == "Drama";
      });
      return pelisfiltradasTags;
    });
    return console.log(respuesta);
  });
}
