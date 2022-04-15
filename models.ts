import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelisData: Peli[];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.pelisData = json;
      return json;
    });
  }

  getById(id: Number): Promise<Peli> {
    return this.getAll().then((json) => {
      const encontrado = json.find((item) => item.id == id);
      return encontrado;
    });
  }

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((json) => {
      var resultado;

      if (options.title && options.tag) {
        resultado = json.filter(
          (item) =>
            item.title.includes(options.title) &&
            item.tags.includes(options.tag)
        );
      } else if (options.title) {
        resultado = json.filter((item) => item.title.includes(options.title));
      } else if (options.tag) {
        resultado = json.filter((item) => item.tags.includes(options.tag));
      }

      return resultado;
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const agregarPeli = this.pelisData.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.pelisData);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
