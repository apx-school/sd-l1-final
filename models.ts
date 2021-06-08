import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((p) => {
      // la respuesta de la promesa
      this.data = p;
      return p;
    });
  }
  getById(id: number) {
    const resultado = this.getAll().then((p) => {
      const encontrado = p.find((item) => {
        return item.id == id;
      });
      return encontrado;
    });
    return resultado;
  }
  search(options: any): Promise<any> {
    if (options.title && options.tag) {
      return this.getAll().then((p) => {
        const encontrada = p.filter((f) => {
          return (
            f.title.includes(options.title) && f.tags.includes(options.tag)
          );
        });
        return encontrada;
      });
    } else if (options.title) {
      return this.getAll().then((p) => {
        const encontrada = p.filter((f) => {
          return f.title.includes(options.title);
        });
        return encontrada;
      });
    } else if (options.tag) {
      return this.getAll().then((p) => {
        const tagsEncontrados = p.filter((f) => {
          return f.tags.includes(options.tag);
        });
        return tagsEncontrados;
      });
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const data = this.data;
        const promesaDos = jsonfile.writeFile("./pelis.json", data).then(() => {
          return true;
        });
        return promesaDos;
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };
