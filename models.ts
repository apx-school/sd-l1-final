import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((peliculas) => {
      // la respuesta de la promesa
      this.pelis = peliculas;
    });
    return promesa;
  }

  async getById(id: number): Promise<Peli> {
    const buscarId = await this.getAll();
    const resultadoId = buscarId.find((x) => {
      return x.id == id;
    });
    return resultadoId;
  }

  async search(options: any): Promise<Peli[]> {
    const searchByTitleOrTag = await this.getAll();
    const resultadoTitleOrTag = searchByTitleOrTag.filter((item) => {
      if (options.title && options.tag) {
        return (
          item.title.includes(options.title) && item.tags.includes(options.tag)
        );
      } else if (options.title) {
        const tituloMapeado = item.title;
        const tituloFind = tituloMapeado.includes(options.title);
        return tituloFind;
      } else if (options.tag) {
        const tagsMapeados = item.tags;
        const tagsFind = tagsMapeados.includes(options.tag);
        return tagsFind;
      }
    });
    return resultadoTitleOrTag;
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.pelis.push(peli);
        const data = this.pelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
  /* add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = this.getAll().then((res) => {
          return res.push(peli);
        });
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  } */
}

export { PelisCollection, Peli };
